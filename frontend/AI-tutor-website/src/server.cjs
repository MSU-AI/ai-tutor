const express = require('express');
const multer = require('multer');
const path = require('path');

// server.cjs
// Create an instance of the express app
const app = express();
const port = 3000;

// Set up multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where you want to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename files to avoid conflicts
  }
});

const upload = multer({ storage });

// Define a POST route to handle file uploads
app.post('/upload', upload.array('files', 10), (req, res) => {
  console.log(req.files); // Print uploaded files' info
  res.send('Files uploaded successfully!');
});

// Serve the frontend (optional)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});