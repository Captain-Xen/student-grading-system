// backend/controller/controller.js

const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Adjust the path to your database connection

// Function to register a new user
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user to the database
    await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role || 'user']);
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to authenticate a user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { id: user[0].user_id, username: user[0].username, role: user[0].role } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to create a default admin if no admin exists
exports.createDefaultAdmin = async () => {
    try {
      // Check if an admin user already exists
      const [admin] = await db.query('SELECT * FROM users WHERE role = ?', ['admin']);
      if (admin.length > 0) {
        console.log('Admin user already exists.');
        return;
      }
  
      // Create a default admin user
      const defaultAdmin = {
        username: 'admin',
        password: 'admin123', // You might want to change this to a more secure default
        role: 'admin'
      };
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      defaultAdmin.password = await bcrypt.hash(defaultAdmin.password, salt);
  
      // Save the default admin to the database
      await db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', 
        [defaultAdmin.username, defaultAdmin.password, defaultAdmin.role]);
      console.log('Default admin user created.');
    } catch (error) {
      console.error('Error creating default admin user:', error);
    }
  };