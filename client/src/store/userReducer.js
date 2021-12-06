import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

const initialState = {
  data: null,
  isLoading: true,
  error: null,
  notifications: null,
  success: false,
};

export const userRegister = createAsyncThunk(
  "userRegister",
  async (formData, { rejectWithValue }) => {
    try {
      var response = await axios.post("/user/register", { data: formData });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "userLogin",
  async (formData, { rejectWithValue }) => {
    try {
      var response = await axios.post("/user/login", { data: formData });
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
      state.success = false;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = true;
      state.notifications = action.payload.msg;
      state.success = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.error = action.payload.msg;
      state.isLoading = true;
      state.notifications = null;
      state.success = false;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
      state.success = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = true;
      state.notifications = action.payload.msg;
      state.success = true;
      state.data = {
        firstName: action.payload.payload.first_name,
        lastName: action.payload.payload.last_name,
        email: action.payload.payload.email,
        token: action.payload.payload.accessToken,
      };
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.payload.msg;
      state.isLoading = true;
      state.notifications = null;
      state.success = false;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
