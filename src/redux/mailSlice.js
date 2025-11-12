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
        const { receive_mails, sent_mails, archived_mails } = action.payload;

        state.all = [...receive_mails, ...sent_mails, ...archived_mails]; // merge all mail
        state.all == // remove duplicate
          state.all.filter(
            (mail, idx, self) =>
              idx === self.findIndex((m) => m._id === mailSlice._id)
          );
        // filter inbox mail
        state.inbox = receive_mails.filter((m) => m.deleted == false);
        // filter starred mail
        state.starred = [
          ...receive_mails.filter(
            (m) => m.starred == true && m.deleted == false
          ),
          ...sent_mails.filter((m) => m.starred == true && m.deleted == false),
          ...archived_mails.filter(
            (m) => m.starred == true && m.deleted == false
          ),
        ];
        // filter trash mail
        state.trash = [
          ...receive_mails.filter((m) => m.deleted == true),
          ...sent_mails.filter((m) => m.deleted == true),
          ...archived_mails.filter((m) => m.deleted == true),
        ];
        // filter sent mail
        state.sent = sent_mails.filter((m) => m.deleted == false);
        // filter archived mail
        state.archived = archived_mails.filter((m) => m.deleted == false);

        state.loading = false;
        // Filter mails into respective types

        // state.draft = action.payload.filter((m) => m.type === "draft");
      })
      .addCase(fetchMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch mails";
      });
  },
});

export const { clearMails, setMailType } = mailSlice.actions;
export default mailSlice.reducer;
