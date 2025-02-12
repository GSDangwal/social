import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await axios.post("auth/login", data);

      if (res.error) {
        return rejectWithValue(res.errors[0]);
      }
      return fulfillWithValue(res.data);
    } catch (error) {
      return rejectWithValue({
        message: error.response.data,
        unexpected: true,
      });
    }
  }
);

const initialState = {
  loading: false,
  data: {},
  error: false,
};

const LoginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.data = payload;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });
  },
});

export default LoginSlice.reducer;
