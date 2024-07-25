import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme, useMediaQuery } from '@mui/material';
import logo from '../assets/dealsdray.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EmployeeListComponents = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
const navigate = useNavigate ();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/employees');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = async (selectedId) => {
    try {
      await axios.delete(`http://localhost:4000/api/employees/${selectedId}`);
      setRows(rows.filter(row => row._id !== selectedId));
      handleClose();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#333",
          padding: "10px",
          display: "flex",
          justifyContent:'space-between',
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <div>
        <img
          src={logo}
          alt="logo"
          style={{ width: isMobile ? "60px" : "60px", borderRadius: "30px" }}
        />
        </div>
        <Link to="/dashboard" style={{paddingTop:'13px'}}>
        <Button 
              style={{
                backgroundColor:"#000",
                color: "white",
                border: "1px solid black",
                borderRadius: "10px",
                width: "100px",
              }}
              
            >
              Home
            </Button>
        </Link>
        
       
       
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="employee table">
          <TableHead>
            <TableRow style={{ backgroundColor: 'black' }}>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>ID</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Image</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Name</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Email</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Mobile Number</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Designation</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Gender</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Course</TableCell>
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }}>Last Updated</TableCell> {/* New column header */}
              <TableCell style={{ color: 'white', fontSize: '20px', fontWeight: "500" }} align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell>
                  <Avatar src={`http://localhost:4000/uploads/${row.image}`} alt={row.name} />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.mobileNo}</TableCell>
                <TableCell>{row.designation}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.lastUpdated ? new Date(row.lastUpdated).toLocaleString() : 'N/A'}</TableCell> {/* Display formatted date */}
                <TableCell align="right">
                  <Link to={`/editemployee/${row._id}`}>
                    <IconButton aria-label="edit">
                      <EditIcon style={{ color: "black" }} />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="delete" onClick={() => handleClickOpen(row._id)}>
                    <DeleteIcon style={{ color: "black" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for delete confirmation */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: "Red" }}>
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "black", backgroundColor: 'yellow', width: "50px" }}>
            No
          </Button>
          <Button onClick={() => handleConfirmDelete(selectedId)} sx={{ color: "black", backgroundColor: 'red', width: "50px" }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeListComponents;
