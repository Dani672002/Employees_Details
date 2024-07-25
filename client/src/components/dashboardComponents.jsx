import * as React from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import logo from "../assets/dealsdray.png";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from 'react-router-dom';

const DashboardComponents = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // username methods//
  const location = useLocation();
  const { username } = location.state || {};
  return (
    <>
      <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#333333",
            padding: "10px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: isMobile ? "60px" : "60px", borderRadius: "30px" }}
          />
        </Box>
        <Container>
      <Box
        style={{
          backgroundColor: "#121416",
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
                  }}
      >
        <Button
          style={{
            backgroundColor: "#000",
            color: "white",
            border: "1px solid black",
            borderRadius: "10px",
            width: "100px",
            marginRight:'10px'

          }}
        >
          Home
        </Button>
        <Link
          to="/list"
          style={{
            textDecoration: 'none',
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            borderRadius: "10px",
            marginRight:'10px'

          }}
        >
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              borderRadius: "10px",
              width: "100px",

            }}
          >
            Employee List
          </Button>
        </Link>
        <Button
          style={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            borderRadius: "10px",
            width: "100px",
            marginRight:'10px'

          }}
        >
          {username || "User"}
        </Button>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            backgroundColor: "black",
            color: "white",
            border: "1px solid black",
            borderRadius: "10px",
          }}
        >
          <Button style={{   paddingTop:'20px'}}>
            <LogoutIcon
              style={{
                color: "white",
                
              }}
            />
          </Button>
        </Link>
      </Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
          marginTop: "10px", // Adjust margin-top based on the height of your fixed header
        }}
      >
        <Link to="/employee" style={{ textDecoration: 'none' }}>
          <Button
            style={{
              backgroundColor: "#2196f3",
              color: "black",
              border: "1px solid black",
              borderRadius: "10px",
              height: "100%",
            }}
          >
            Create Employee
            <AddIcon style={{ fontSize: "30px" }} />
          </Button>
        </Link>
      </Box>

      <Box
        style={{
          
          alignItems: "center",
          marginTop:"120px"
        }}
      >
        <h1 style={{ color: "white", fontWeight: "800", textAlign: "center" }}>
          Welcome {username || 'User'}
        </h1>
      </Box>
    </Container>
      </Box>
    </>
  );
};

export default DashboardComponents;
