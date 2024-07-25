const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure unique email addresses
    },
    mobileNo: {
        type: String,
        required: true
    },

    designation: {
        type: String,
        enum:  ['HR', 'Manager', 'Sales'],
        required: true
      },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    course: {
        type: [String], // Store as array
        required: true
    },
    image: {
        type: String // Storing the file path or URL of the uploaded image
    },
    lastUpdated:{
Date : Intl
    }

});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
