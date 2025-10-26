import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, thunkAPI) => {
    try {
      const res = await apiClient.get("/auth/me");
      return res.data.data; // expected: { id, name, email, ... }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
