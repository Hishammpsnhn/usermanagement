import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Tab, Tabs } from "@mui/material";
const initialData = {
  email: "",
  password: "",
  username: "",
};
const Auth = () => {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(initialData);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = () => {
    console.log("login", data);
  };
  const handleSignup = () => {
    console.log("singup", data);
  };

  useEffect(() => {
    setData(initialData);
  }, [tab]);

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome
      </Typography>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Login" />
        <Tab label="Signup" />
      </Tabs>

      <Box component="form" sx={{ mt: 3 }}>
        {tab === 1 && (
          <TextField
            value={data.username}
            onChange={handleChange}
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
        <TextField
          value={data.email}
          onChange={handleChange}
          label="Email"
          variant="outlined"
          name="email"
          fullWidth
          margin="normal"
          type="email"
        />
        <TextField
          value={data.password}
          onChange={handleChange}
          label="Password"
          variant="outlined"
          name="password"
          fullWidth
          margin="normal"
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={tab === 1 ? handleSignup : handleLogin}
        >
          {tab === 1 ? "Signup" : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(Auth);
