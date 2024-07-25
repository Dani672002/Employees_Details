const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const upload = require('../middleware/uploadMiddleware'); // Adjust the path as necessary
const {updateEmployee} = require("../controller/employeeController")
const { uploadImage, createEmployee } = require('../controller/employeeController'); // Correct path

router.post('/employees', uploadImage, employeeController.createEmployee);
router.get('/employees', employeeController.getEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.put('/employees/:id',uploadImage, employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);
router.put('/employees/', updateEmployee);

module.exports = router;
