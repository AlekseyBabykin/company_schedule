import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchSignUp = createAsyncThunk(
  "api/fetchSignUp",
  async ({ email, password }) => {
    const response = await axios.post(`${apiUrl}/api/user/signup`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return jwtDecode(response.token);
  }
);

export const fetchSignIn = createAsyncThunk(
  "api/fetchSignIn",
  async ({ email, password }) => {
    const response = await axios.post(`${apiUrl}/api/user/signin`, {
      email,
      password,
    });
  if (response.status === 200) {
    console.log('from login client',response.status, response.data)
    console.log ("response.data.token from apiSlice", response.data.token)

  }
  // other code
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(fetchSignIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
