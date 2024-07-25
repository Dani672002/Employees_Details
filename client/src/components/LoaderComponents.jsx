// LoaderComponent.jsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoaderComponent = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoaderComponent;
