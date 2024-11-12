import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button, Typography, Tab, Tabs } from "@mui/material";
import { loginUser, signup } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

const initialData = {
  email: "hishammp@gmail.com",
  password: "9562553610",
  username: "",
};
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user,isAuthenticated } = useSelector((state) => state.user);
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
    dispatch(loginUser(data)).then((res) => {
      console.log(res);
      if (res.payload) {
        console.log(res.payload);
        setData(initialData);
        // const userData = {
        //   token: res.payload.token,
        //   _id: res.payload._id,
        //   username: res.payload.username,
        //   isAdmin: action.payload.isAdmin,
        // };
        // console.log(userData);
        //localStorage.setItem("token", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
        console.log(res.payload.isAdmin)
        if (res.payload.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    });
  };
  const handleSignup = () => {
    console.log("singup", data);
    dispatch(signup(data)).then((res) => {
      if (res.payload ) {
        alert("logged sin")
        setData(initialData);
        // const userData = {
        //   token: res.payload.token,
        //   _id: res.payload._id,
        //   username: res.payload.username,
        //   isAdmin: action.payload.isAdmin,
        // };
        //console.log(userData);
        //localStorage.setItem("token", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");
        if (res.payload.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    });
  };

  useEffect(() => {
    setData(initialData);
  }, [tab]);

  
  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin");
    } else if (user) {
      navigate("/")
    }
  }, [user, navigate]);

  if(user || isAuthenticated){
    return;
  }
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
          disabled={loading}
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
