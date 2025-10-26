import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

// Fetch all mails from backend
export const fetchMails = createAsyncThunk(
  "mail/fetchMails",
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get("/mail"); // adjust endpoint
      return res.data?.data; // expected: array of mails
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch mails"
      );
    }
  }
);

const initialState = {
  all: [],
  inbox: [],
  sent: [],
  archived: [],
  trash: [],
  starred: [],
  draft: [],
  loading: false,
  error: null,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    clearMails: (state) => {
      state.all = [];
      state.inbox = [];
      state.sent = [];
      state.archived = [];
      state.trash = [];
      state.starred = [];
      state.draft = [];
      state.loading = false;
      state.error = null;
    },
    setMailType: (state, action) => {
      // Optional: manually set filtered mails
      const { type, mails } = action.payload;
      state[type] = mails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;

        // Filter mails into respective types
        state.inbox = action.payload.filter((m) => m.type === "inbox");
        state.sent = action.payload.filter((m) => m.type === "sent");
        state.archived = action.payload.filter((m) => m.type === "archived");
        state.trash = action.payload.filter((m) => m.delete == true);
        state.starred = action.payload.filter((m) => m.type === "starred");
        state.draft = action.payload.filter((m) => m.type === "draft");
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch mails";
      });
  },
});

export const { clearMails, setMailType } = mailSlice.actions;
export default mailSlice.reducer;
