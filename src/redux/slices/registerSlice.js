import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "register",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await axios.post("auth/register", data);
      if (res.error) {
        rejectWithValue(res.error);
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
  data: "",
  error: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.error = false;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });
  },
});

export default registerSlice.reducer;
