const express = require('express');
const authController = require('../controller/authController'); // Adjust path as necessary

const router = express.Router();

// Register a new user (POST)
router.post('/register', authController.register);

// Login user (POST)
router.post('/login', authController.login);

module.exports = router;
