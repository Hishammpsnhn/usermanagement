import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AccountCircle,
} from "@mui/icons-material";
import axios from "axios";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      console.log(URL.createObjectURL(event.target.files[0]));
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user", {
          withCredentials: true,
        });
        setUserDetail(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error :", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Profile
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <label htmlFor="upload-avatar">
            <input
              type="file"
              id="upload-avatar"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <Avatar
              src={userDetail?.pic}
              alt="Profile Image"
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: "2px solid #1976d2",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            />
          </label>
        </Box>

        {/* Profile Information Form */}
        <Box component="form">
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              variant="outlined"
              fullWidth
              value={userDetail?.username}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 3 }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField variant="outlined" fullWidth value={userDetail?.email} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontWeight: "bold", fontSize: 16 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
