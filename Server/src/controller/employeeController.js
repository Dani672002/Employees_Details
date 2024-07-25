const Employee = require('../models/employeeModels');
const upload = require('../middleware/uploadMiddleware'); // Adjust the path as necessary

exports.uploadImage = upload.single('image');
exports.createEmployee = async (req, res) => {
    try {
      const { name, email, mobileNo, designation, gender, course } = req.body;
      const image = req.file ? req.file.location : undefined; // S3 file URL
  
      // Validation
      if (!name || !email || !mobileNo || !designation || !gender || !course) {
        return res.status(400).json({ message: 'All required fields must be provided' });
      }
  
      // Create new employee
      const newEmployee = new Employee({
        name,
        email,
        mobileNo,
        designation,
        gender,
        course: JSON.parse(course), 
        image,
      });
  
      await newEmployee.save();
      res.status(201).json(newEmployee);
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(400).json({ message: error.message });
    }
  };
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { name, email, mobileNo, designation, gender, course } = req.body;
        
        const image = req.file ? req.file.path : undefined;

        const updatedData = { name, email, mobileNo, designation, gender, course };
        
        if (image) updatedData.image = image;

        const employee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//date updates//

exports.updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate ID and request body
      if (!id) {
        return res.status(400).json({ message: 'Employee ID is required' });
      }
  
      const updateData = {
        ...req.body,
        lastUpdated: new Date(), 
      };
  
      // Find and update the employee
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
  
      // Check if employee was found and updated
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.json(updatedEmployee);
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Error updating employee' });
    }
  };


  
