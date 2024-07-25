import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import logo from '../assets/dealsdray.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import config from "../config"; // Import the configuration

const EditEmployeeComponents = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: '',
    imageUpload: null,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch employee data by ID
    axios.get(`${config.backendUrl}/api/employees/${id}`)
      .then(response => {
        const employee = response.data;
        setInitialValues({
          name: employee.name || '',
          email: employee.email || '',
          mobileNo: employee.mobileNo || '',
          designation: employee.designation || '',
          gender: employee.gender || '',
          course: employee.course || '',
          imageUpload: null,
        });
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // To allow formik to update when initialValues change
    validationSchema: Yup.object({
      name: Yup.string().required('Name is Required'),
      email: Yup.string().email('Invalid email address').required('Email is Required'),
      mobileNo: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').required('Mobile is Required'),
      designation: Yup.string().required('Designation is Required'),
      gender: Yup.string().required('Select at least one Required'),
      course: Yup.string().required('Select a course'),
      imageUpload: Yup.mixed(), // No longer required
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('mobileNo', values.mobileNo);
        formData.append('designation', values.designation);
        formData.append('gender', values.gender);
        formData.append('course', values.course);
        if (values.imageUpload) {
          formData.append('imageUpload', values.imageUpload);
        }
    
        await axios.put(`${config.backendUrl}/api/employees/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        setSuccessMessage('Employee updated successfully!');
        navigate('/list');
      } catch (error) {
        setError('Error updating employee data.');
        console.error('Error updating employee data:', error);
      }
    }
  });

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#333",
          padding: "10px",
          display: "flex",
          justifyContent: "flex-start",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: isMobile ? "60px" : "60px", borderRadius: "30px" }}
        />
      </Box>
      <Container sx={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
        <Typography
          sx={{
            color: "#333",
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Edit Employee
        </Typography>
        {error && <div style={{ color: 'red', fontSize: '0.875em' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green', fontSize: '0.875em' }}>{successMessage}</div>}
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#333', color: '#fff' }}
              />
              {formik.touched.name && formik.errors.name ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.name}</div> : null}
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#333', color: '#fff' }}
              />
              {formik.touched.email && formik.errors.email ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.email}</div> : null}
            </label>
            <label>
              Mobile No:
              <input
                type="text"
                name="mobileNo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobileNo}
                style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#333', color: '#fff' }}
              />
              {formik.touched.mobileNo && formik.errors.mobileNo ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.mobileNo}</div> : null}
            </label>
            <div>
              <label htmlFor="designation" style={{ marginBottom: '5px', display: 'block' }}>Designation</label>
              <select
                id="designation"
                name="designation"
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '8px 0',
                  display: 'block',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#333',
                  color: '#fff',
                }}
                onChange={formik.handleChange}
                value={formik.values.designation}
              >
                <option value="" label="Select designation" />
                <option value="HR" label="HR" />
                <option value="Manager" label="Manager" />
                <option value="Sales" label="Sales" />
              </select>
              {formik.touched.designation && formik.errors.designation ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.designation}</div> : null}
            </div>
            <label>
              Gender:
              <select
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#333', color: '#fff' }}
              >
                <option value="" label="Select gender" />
                <option value="Male" label="Male" />
                <option value="Female" label="Female" />
                <option value="Other" label="Other" />
              </select>
              {formik.touched.gender && formik.errors.gender ? <div style={{ color: 'red', fontSize: '0.875em' }}>{formik.errors.gender}</div> : null}
            </label>
            <label>
              Courses:
              <div>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="BE"
                    checked={formik.values.course === 'BE'}
                    onChange={formik.handleChange}
                    style={{ marginRight: '8px' }}
                  />
                  BE
                </label>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="MBA"
                    checked={formik.values.course === 'MBA'}
                    onChange={formik.handleChange}
                    style={{ marginRight: '8px' }}
                  />
                  MBA
                </label>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="MCA"
                    checked={formik.values.course === 'MCA'}
                    onChange={formik.handleChange}
                    style={{ marginRight: '8px' }}
                  />
                  MCA
                </label>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="BSC"
                    checked={formik.values.course === 'BSC'}
                    onChange={formik.handleChange}
                    style={{ marginRight: '8px' }}
                  />
                  BSC
                </label>
              </div>
            </label>
            <label>
              Image Upload (optional):
              <input
                type="file"
                name="imageUpload" // This should match 'imageUpload' in multer.single() or multer.array()
                onChange={(event) => {
                  formik.setFieldValue('imageUpload', event.currentTarget.files[0]);
                }}
                style={{ width: '100%', padding: '10px', margin: '8px 0', display: 'block', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#333', color: '#fff' }}
              />
            </label>
            <button type="submit" style={{ padding: '10px 20px', margin: '16px 0', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Update Employee</button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default EditEmployeeComponents;
