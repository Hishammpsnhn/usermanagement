import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Button,
  Typography,
  TextField,
  Paper
} from '@mui/material';
import { Edit as EditIcon, Email as EmailIcon, Phone as PhoneIcon, AccountCircle } from '@mui/icons-material';

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      console.log(URL.createObjectURL(event.target.files[0]))
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Profile
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <label htmlFor="upload-avatar">
            <input
              type="file"
              id="upload-avatar"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <Avatar
              src={selectedImage}
              alt="Profile Image"
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '2px solid #1976d2',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            />
          </label>
       
        </Box>

        {/* Profile Information Form */}
        <Box component="form">
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
            <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
            />
          </Box>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 'bold', fontSize: 16 }}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
