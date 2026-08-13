import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_for_cv_spark';

// ─── Database ──────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const dbPath     = join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) { console.error('DB error:', err); return; }
  console.log('✅ Connected to SQLite database');
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    identifier TEXT NOT NULL,
    otp TEXT NOT NULL,
    expiresAt INTEGER NOT NULL
  )`);
});

const runQ  = (q, p = []) => new Promise((res, rej) => db.run(q, p, function(e) { e ? rej(e) : res(this) }));
const getQ  = (q, p = []) => new Promise((res, rej) => db.get(q, p, (e, r) => e ? rej(e) : res(r)));

// ─── Email transporter (Nodemailer) ────────────────────────────────────────
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS &&
      !process.env.GMAIL_USER.includes('your_gmail')) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });
    console.log('✅ Gmail SMTP configured');
  } else {
    // Development fallback: Ethereal (fake SMTP, shows preview URL in console)
    transporter = 'pending'; // resolved async below
    nodemailer.createTestAccount().then(acc => {
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: { user: acc.user, pass: acc.pass },
      });
      console.log('📧 Dev SMTP (Ethereal) configured — OTPs shown in console as preview links');
    });
    return null; // will retry
  }
  return transporter;
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtpEmail = async (to, otp) => {
  const tp = getTransporter();

  // If real gmail is configured, send real email
  if (tp && tp !== 'pending') {
    const info = await tp.sendMail({
      from: `"CV Spark" <${process.env.EMAIL_FROM || process.env.GMAIL_USER}>`,
      to,
      subject: `Your CV Spark OTP: ${otp}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:16px;">
          <h2 style="color:#1e293b;margin-bottom:8px;">Your verification code</h2>
          <p style="color:#64748b;margin-bottom:24px;">Enter this code to sign in to CV Spark. It expires in 5 minutes.</p>
          <div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:24px;text-align:center;">
            <span style="font-size:40px;font-weight:800;letter-spacing:12px;color:#2563eb;">${otp}</span>
          </div>
          <p style="color:#94a3b8;font-size:12px;margin-top:24px;text-align:center;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });
    console.log(`📧 Email sent to ${to}`);
    return info;
  } else {
    // Fallback: just log to console
    console.log(`\n🔐 [DEV OTP] Email: ${to} → Code: ${otp}\n`);
    return null;
  }
};

// ─── Routes ────────────────────────────────────────────────────────────────

// POST /api/auth/send-otp
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { identifier, method } = req.body;
    if (!identifier) return res.status(400).json({ error: 'identifier required' });

    // Clean up expired OTPs
    await runQ('DELETE FROM otps WHERE expiresAt < ?', [Date.now()]);

    // Rate limit: max 3 active OTPs per identifier
    const active = await getQ('SELECT COUNT(*) as count FROM otps WHERE identifier = ? AND expiresAt > ?', [identifier, Date.now()]);
    if (active.count >= 3) return res.status(429).json({ error: 'Too many OTP requests. Please wait a few minutes.' });

    const otp       = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min
    await runQ('INSERT INTO otps (identifier, otp, expiresAt) VALUES (?, ?, ?)', [identifier, otp, expiresAt]);

    if (method === 'email') {
      await sendOtpEmail(identifier, otp);
    } else {
      console.log(`\n📱 [SMS MOCK] Phone: ${identifier} → OTP: ${otp}\n`);
    }

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('send-otp error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/verify-otp
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { identifier, otp, method } = req.body;
    if (!identifier || !otp) return res.status(400).json({ error: 'identifier and otp required' });

    const record = await getQ(
      'SELECT * FROM otps WHERE identifier = ? AND otp = ? AND expiresAt > ? ORDER BY id DESC LIMIT 1',
      [identifier, otp, Date.now()]
    );
    if (!record) return res.status(400).json({ error: 'Invalid or expired OTP' });

    // Invalidate used OTP
    await runQ('DELETE FROM otps WHERE identifier = ?', [identifier]);

    // Find or create user
    let user;
    if (method === 'phone') {
      user = await getQ('SELECT * FROM users WHERE phone = ?', [identifier]);
      if (!user) { const r = await runQ('INSERT INTO users (phone) VALUES (?)', [identifier]); user = { id: r.lastID, phone: identifier }; }
    } else {
      user = await getQ('SELECT * FROM users WHERE email = ?', [identifier]);
      if (!user) { const r = await runQ('INSERT INTO users (email) VALUES (?)', [identifier]); user = { id: r.lastID, email: identifier }; }
    }

    const token = jwt.sign({ userId: user.id, [method]: identifier }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, email: user.email, phone: user.phone } });
  } catch (err) {
    console.error('verify-otp error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  getTransporter(); // init email transporter eagerly
});
