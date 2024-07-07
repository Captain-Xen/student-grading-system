const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { pool } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const { createDefaultAdmin } = require('./controllers/userController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await pool.getConnection();
    console.log(`Server running on port ${PORT}`);
    
    // Call the function to create the default admin user
    await createDefaultAdmin();
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
});
