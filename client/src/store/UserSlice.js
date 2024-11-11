// UserSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (userCredential) => {
    const req = await axios.post(
      "http://localhost:4000/api/auth/login",
      userCredential,
      {
        withCredentials: true,
      }
    );
    console.log(req);
    const res = await req.data;
    return res;
  }
);
export const signup = createAsyncThunk(
  "user/signup",
  async (userCredential) => {
    const req = await axios.post(
      "http://localhost:4000/api/auth/signup",
      userCredential
    );
    const res = await req.data.data;
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: localStorage.getItem("token") || null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { id: action.payload._id, token: action.payload.token };
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 400") {
          state.error = "Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
        console.log(action.error);
      })

      //signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { id: action.payload._id, token: action.payload.token };
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 400") {
          state.error = "Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
        console.log(action.error);
      });
  },
});

export default userSlice.reducer;
