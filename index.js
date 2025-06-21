const express = require('express');

const app = express();

const PORT = 4000;

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