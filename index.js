const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 
const cors = require('cors'); // Import cors for handling CORS issues

require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT; // Use PORT from environment 

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true 
})) // Use CORS middleware to allow cross-origin requests

app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json());
require('./DBConn/conn'); // Ensure this file exists and is correctly set up for MongoDB connection

app.get('/', (req, res) => {
  res.send({"message": "Hello, World! This is a simple Express server."});
});

const GymRoutes = require('./Routes/gym'); // Ensure this file exists and is correctly set up for routes
const MembershipRoutes = require('./Routes/membership'); // Ensure this file exists and is correctly set up for routes
const MemberRoutes = require('./Routes/member'); // Ensure this file exists and is correctly set up for routes


app.use('/auth', GymRoutes); // Use the gym routes under the /api/gym path
app.use('/plans', MembershipRoutes); // Use the membership routes under the /api/membership path
app.use('/members', MemberRoutes); // Use the member routes under the /api/member path

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})