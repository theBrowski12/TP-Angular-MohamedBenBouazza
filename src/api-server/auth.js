const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'secret_key_à_personnaliser'; // doit être identique à celui de index.js

const users = []; // temporaire, à remplacer par une DB plus tard

// Middleware d'authentification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Register
router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword, role: role || 'user' });
  res.status(201).json({ message: 'User registered' });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Exporter à la fois les routes et le middleware
module.exports = {
  router,
  authenticateToken
};
