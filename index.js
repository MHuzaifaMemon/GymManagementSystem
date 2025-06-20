const express = require('express');

const app = express();

const PORT = 4000;


require('./DBConn/conn'); // Ensure this file exists and is correctly set up for MongoDB connection

app.get('/', (req, res) => {
  res.send({"message": "Hello, World! This is a simple Express server."});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})