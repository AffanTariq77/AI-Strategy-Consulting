// Basic Express server setup for contact form API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from Vite build (dist)
const path = require('path');
const fs = require('fs');
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  console.log('Serving static files from', distPath);
} else {
  console.warn('Vite build directory not found:', distPath);
}

// SQLite DB setup
const dbPath = './contact_submissions.db';
if (!fs.existsSync(dbPath)) {
  console.warn('Database file does not exist, it will be created:', dbPath);
} else {
  console.log('Database file found:', dbPath);
}
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip TEXT,
  user_agent TEXT
)`, (err) => {
  if (err) {
    console.error('Error creating/checking submissions table:', err);
  } else {
    console.log('submissions table is ready.');
  }
});

// Nodemailer setup
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin123';

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // In a real app, use JWT or session here
    res.json({ success: true, message: 'Login successful', token: 'dummy-admin-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// API endpoint to receive contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, company, message } = req.body;
  const ip = req.ip;
  const user_agent = req.headers['user-agent'] || '';
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  db.run(
    `INSERT INTO submissions (name, email, company, message, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, company || '', message, ip, user_agent],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error.' });
      }
      // Send email notification
      const mailOptions = {
        from: `Contact Form <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nMessage: ${message}\nTime: ${new Date().toISOString()}\nIP: ${ip}\nUser Agent: ${user_agent}`,
        html: `<h2>New Contact Form Submission</h2><ul><li><b>Name:</b> ${name}</li><li><b>Email:</b> ${email}</li><li><b>Company:</b> ${company || '-'}</li><li><b>Message:</b> ${message}</li><li><b>Time:</b> ${new Date().toISOString()}</li><li><b>IP:</b> ${ip}</li><li><b>User Agent:</b> ${user_agent}</li></ul>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      res.status(200).json({ success: true, id: this.lastID });
    }
  );
});

// API endpoint to get all submissions (for admin panel)
app.get('/api/admin/submissions', (req, res) => {
  // TODO: Add authentication
  console.log('GET /api/admin/submissions called');
  db.all('SELECT id, name, email, company, message, timestamp FROM submissions ORDER BY timestamp DESC', [], (err, rows) => {
    if (err) {
      console.error('--- DATABASE ERROR in /api/admin/submissions ---');
      console.error('Message:', err.message);
      console.error('Stack:', err.stack);
      console.error('Full error object:', err);
      return res.status(500).json({ error: 'Database error: ' + err.message });
    }
    console.log('Fetched submissions:', rows);
    res.json(rows);
  });
});


// Catch-all: send index.html for client-side routing (SPA)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  if (fs.existsSync(distPath)) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(500).send('Frontend build not found. Please run "npm run build" in the project root.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
