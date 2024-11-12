import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (user.isAdmin) {
      navigate('/admin')
    }
  }, []);

  if(!user || user?.isAdmin){
    navigate('/auth')
    return;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.username || "User"}!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginTop: 2 }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro error
        </Typography>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
