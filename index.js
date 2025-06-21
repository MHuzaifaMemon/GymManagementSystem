const express = require('express');

const app = express();
const cookieParser = require('cookie-parser'); 
require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT; // Use PORT from environment 


app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json());
require('./DBConn/conn'); // Ensure this file exists and is correctly set up for MongoDB connection

app.get('/', (req, res) => {
  res.send({"message": "Hello, World! This is a simple Express server."});
});

const GymRoutes = require('./Routes/gym'); // Ensure this file exists and is correctly set up for routes

app.use('/auth', GymRoutes); // Use the gym routes under the /api/gym path


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})