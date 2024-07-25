import React from 'react';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import logo from '../assets/dealsdray.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeComponents = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobileNo: '',
      designation: '',
      gender: '',
      course: [],
      imageUpload: " ",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      mobileNo: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('Required'),
      designation: Yup.string().required('Required'),
      gender: Yup.string().required('Required'),
      course: Yup.array().min(1, 'At least one course must be selected'),
      imageUpload: Yup.mixed().required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('mobileNo', values.mobileNo);
      formData.append('designation', values.designation);
      formData.append('gender', values.gender);
      formData.append('course', JSON.stringify(values.course));
      formData.append('imageUpload', values.imageUpload);
  
      try {
        const response = await axios.post('http://localhost:4000/api/employees', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 201) {
          alert('Employee Created Successfully');
        
          navigate('/list'); // Navigate to the list page
        } else {
          alert('Submission Failed');
        }
      } catch (error) {
        console.error('Error during submission:', error.response || error.message);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    },
  });
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      formik.setFieldValue('course', [...formik.values.course, value]);
    } else {
      formik.setFieldValue('course', formik.values.course.filter((course) => course !== value));
    }
  };

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', backgroundColor: '#333333', padding: '10px', display: 'flex', justifyContent: 'flex-start' }}>
        <img src={logo} alt="logo" style={{ width: isMobile ? '60px' : '60px', borderRadius: '30px' }} />
      </Box>
      <Container style={{ overflow: 'auto', height: '90%' }}>
        <form onSubmit={formik.handleSubmit} style={{ backgroundColor: '#000', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '100%', margin: '20px auto', color: '#fff', overflowY: 'auto', maxHeight: '80vh' }}>
          <div>
            <label htmlFor="name" style={{ marginBottom: '5px', display: 'block' }}>Name</label>
            <input id="name" name="name" type="text" style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#333', color: '#fff' }} onChange={formik.handleChange} value={formik.values.name} />
            {formik.touched.name && formik.errors.name ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.name}</div> : null}
          </div>

          <div>
            <label htmlFor="email" style={{ marginBottom: '5px', display: 'block' }}>Email</label>
            <input id="email" name="email" type="email" style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#333', color: '#fff' }} onChange={formik.handleChange} value={formik.values.email} />
            {formik.touched.email && formik.errors.email ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.email}</div> : null}
          </div>

          <div>
            <label htmlFor="mobileNo" style={{ marginBottom: '5px', display: 'block' }}>Mobile Number</label>
            <input id="mobileNo" name="mobileNo" type="text" style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', backgroundColor: '#333', color: '#fff' }} onChange={formik.handleChange} value={formik.values.mobileNo} />
            {formik.touched.mobileNo && formik.errors.mobileNo ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.mobileNo}</div> : null}
          </div>

          <div>
            <label htmlFor="designation" style={{ marginBottom: '5px', display: 'block' }}>Designation</label>
            <select id="designation" name="designation" style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#333', color: '#fff' }} onChange={formik.handleChange} value={formik.values.designation}>
              <option value="" label="Select designation" />
              <option value="HR" label="HR" />
              <option value="Manager" label="Manager" />
              <option value="sales" label="sales" />
            </select>
            {formik.touched.designation && formik.errors.designation ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.designation}</div> : null}
          </div>

          <div>
            <label style={{ marginBottom: '5px', display: 'block' }}>Gender</label>
            <label>
              <input type="radio" name="gender" value="Male" style={{ marginRight: '10px' }} onChange={formik.handleChange} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" style={{ marginRight: '10px' }} onChange={formik.handleChange} />
              Female
            </label>
            {formik.touched.gender && formik.errors.gender ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.gender}</div> : null}
          </div>

          <div>
            <label style={{ marginBottom: '5px', display: 'block' }}>Course</label>
            <label>
              <input type="checkbox" name="course" value="MCA" onChange={handleCheckboxChange} style={{ marginRight: '10px' }} />
              MCA
            </label>
            <label>
              <input type="checkbox" name="course" value="BCA" onChange={handleCheckboxChange} style={{ marginRight: '10px' }} />
              BCA
            </label>
            <label>
              <input type="checkbox" name="course" value="BSC" onChange={handleCheckboxChange} style={{ marginRight: '10px' }} />
              BSC
            </label>
            {formik.touched.course && formik.errors.course ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.course}</div> : null}
          </div>

          <div>
            <label htmlFor="imageUpload" style={{ marginBottom: '5px', display: 'block' }}>Image Upload</label>
            <input
              id="imageUpload"
              name="imageUpload"
              type="file"
              // onChange={(event) => formik.setFieldValue('imageUpload', event.currentTarget.files[0])}
            />
            {/* {formik.touched.imageUpload && formik.errors.imageUpload ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.imageUpload}</div> : null} */}
          </div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </Container>
    </Box>
  );
};

export default EmployeeComponents;
