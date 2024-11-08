// UserSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    
  },
});

export default userSlice.reducer;
