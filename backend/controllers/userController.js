const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user (Admin)
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user[0].user_id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all users (Admin)
exports.getUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
