require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const employeeRoutes = require('./src/routes/employee'); // Adjust path as needed

const app = express();

const PORT = process.env.PORT || 4000;

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adds a timestamp to the filename
  },
});
const upload = multer({ storage });

// Middleware

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for serving static files (like uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the routes
app.use('/api', employeeRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Database Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB is connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
