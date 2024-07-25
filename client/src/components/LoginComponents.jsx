import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/dealsdray.png";
import { _toast } from "../utils/toastUtills.js";
import axios from "axios";
import config from "../config"; // Import the configuration

const LoginComponents = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(true); // State to toggle between register and login

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isRegister) {
        const response = await axios.post(`${config.backendUrl}/auth/register`, data);
        if (response?.status === 201) {
          _toast("Registration Successful", "success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          _toast("Registration Failed", "error");
        }
      } else {
        const response = await axios.post(`${config.backendUrl}/auth/login`, data);
        if (response?.status === 200) {
          _toast("Login Successful", "success");
          setTimeout(() => {
            navigate("/dashboard", { state: { username: data.username } });
          }, 2000);
        } else {
          _toast("Login Failed", "error");
        }
      }
    } catch (error) {
      console.error("Error during request:", error.response || error.message);
      _toast("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <>
      <ToastContainer />
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
        <Box
          sx={{
            paddingTop: isMobile ? "150px" : "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#131415",
              padding: isMobile ? "20px" : "40px",
              borderRadius: "50px",
              textAlign: "center",
              width: isMobile ? "90%" : "60%",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: "700",
                fontSize: isMobile ? "20px" : "30px",
                color: "#4B72C2",
                marginBottom: "20px",
              }}
            >
              {isRegister ? "Register" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: "Username is required",
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Username *"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: "#fff" } }}
                        InputProps={{
                          style: { color: "#fff" },
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: "#fff",
                            },
                            '&:hover fieldset': {
                              borderColor: "#fff",
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#fff"
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#fff',
                          }
                        }}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: isMobile ? "10px" : "20px" }}>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Password *"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        InputLabelProps={{ style: { color: "#fff" } }}
                        InputProps={{
                          style: { color: "#fff" },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                style={{ color: "#fff" }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: "#fff"
                            },
                            '&:hover fieldset': {
                              borderColor: "#fff"
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: "#fff"
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#fff',
                          }
                        }}
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "center", marginTop: isMobile ? "30px" : "30px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    border: "1px solid #4B72C2",
                    borderRadius: "20px",
                    width: "100px",
                  }}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#4B72C2" }} />
                  ) : (
                    <span
                      style={{
                        color: "#4B72C2",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isRegister ? "Register" : "Login"}
                    </span>
                  )}
                </Button>
              </Box>
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                <Button
                  variant="text"
                  sx={{
                    color: "#4B72C2",
                  }}
                  onClick={() => setIsRegister(!isRegister)}
                >
                  {isRegister ? "Switch to Login" : "Switch to Register"}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginComponents;
