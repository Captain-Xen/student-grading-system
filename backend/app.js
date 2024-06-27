const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db'); // Adjust the path to your database connection
const routes = require('./routes/routes');
const { createDefaultAdmin } = require('./controllers/controller');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Create default admin if none exists
  await createDefaultAdmin();
});
