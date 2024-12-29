import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: {name:string, email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("https://server-invoice.vercel.app/api/auth/register", userData);
      return response.data; 
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message || "Registration failed");
      }
      return thunkAPI.rejectWithValue("Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;