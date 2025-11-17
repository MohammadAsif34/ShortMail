import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import apiClient from "../api/apiClient";
import apiClient from "../api/apiClient";

// Fetch all mails from backend --> done --> works
export const fetchMails = createAsyncThunk(
  "email/fetchMails",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await apiClient.get("/email");
      return { ...res.data?.data, email: state.user.data?.email };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch mails"
      );
    }
  }
);

// send emails --> done --> works
export const sendEmails = createAsyncThunk(
  "email/sendEmails",
  async (data, thunkAPI) => {
    try {
      const res = await apiClient.post("/email/send", data);
      return res.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to send Email.");
    }
  }
);

// Delete/restore mail --> done --> works
export const trashMails = createAsyncThunk(
  "email/trashMails",
  async (id, thunkAPI) => {
    const data = { data: { id } };
    try {
      const state = thunkAPI.getState();
      const res = await apiClient.delete("/email/trash", { data });
      return { ...res.data, id: id, email: state.user.data?.email };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to restore mails"
      );
    }
  }
);

// Read/unread email --> done --> works
export const readMails = createAsyncThunk(
  "email/readMails",
  async (id, thunkAPI) => {
    try {
      const res = await apiClient.put("/email/read", { id });
      return { ...res.data, id: id };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to read mails"
      );
    }
  }
);

// Starred/unstarred mail --> done --> works
export const starredMails = createAsyncThunk(
  "email/starredMails",
  async (id, thunkAPI) => {
    try {
      const res = await apiClient.put("/email/starred ", { id });
      return { ...res.data, id: id };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to starred mails"
      );
    }
  }
);

// Archived/unarchived mail --> done --> works
export const archivedMails = createAsyncThunk(
  "email/archivedMails",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const res = await apiClient.put("/email/archived", { id });
      return { ...res.data, id: id, email: state.user?.data?.email };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to archived mails"
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

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    clearMails: () => ({ ...initialState }),
    addNewInboxMail: (state, action) => {
      const email = action.payload;
      if (
        email.to &&
        !email.archived &&
        !email.deleted &&
        !state.inbox.find((m) => m._id === email._id)
      )
        state.inbox.unshift(email);
    },
  },
  extraReducers: (builder) => {
    builder
      //@desc get all emails --> done -> work
      .addCase(fetchMails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMails.fulfilled, (state, action) => {
        const { emails, email } = action.payload;
        state.all = emails;
        state.inbox = emails.filter(
          (m) => m.to === email && m.to !== m.from && !m.archived && !m.deleted
        );
        state.sent = emails.filter(
          (m) =>
            m.from === email && m.type === "sent" && !m.archived && !m.deleted
        );
        state.starred = emails.filter((m) => m.starred == true && !m.deleted);
        state.archived = emails.filter((m) => m.archived == true && !m.deleted);
        state.trash = emails.filter((m) => m.deleted == true);
        // console.log("e", e);
        // state.inbox = emails.filter((m) => );
        state.loading = false;
      })
      .addCase(fetchMails.rejected, (state) => {
        state.loading = false;
      })
      //@desc send emails --> done --> works
      .addCase(sendEmails.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendEmails.fulfilled, (state, action) => {
        state.all.push(action.payload.email);
        state.sent.push(action.payload.email);
        state.loading = false;
      })
      .addCase(sendEmails.rejected, (state) => {
        state.loading = false;
      })
      //@desc read/unread email--> done --> works
      .addCase(readMails.pending, (state) => {
        state.loading = true;
      })
      .addCase(readMails.fulfilled, (state, action) => {
        const { id } = action.payload;

        ["inbox", "sent", "archived"].forEach((box) => {
          // if (!Array.isArray(state[box])) state[box] = [];
          const email = state[box].find((m) => m._id === id);
          if (email) email.read = !email.read;
        });

        state.loading = false;
      })
      .addCase(readMails.rejected, (state) => {
        state.loading = false;
      })
      //@desc starred email --> done --> works
      .addCase(starredMails.pending, (state) => {
        state.loading = true;
      })
      .addCase(starredMails.fulfilled, (state, action) => {
        const { id } = action.payload;

        ["inbox", "sent", "archived"].forEach((box) => {
          let email = state[box].find((m) => m._id === id);
          if (email) email.starred = !email.starred;
        });

        state.loading = false;
      })
      .addCase(starredMails.rejected, (state) => {
        state.loading = false;
      })
      //@desc archived/unarchived email --> done --> works
      .addCase(archivedMails.pending, (state) => {
        state.loading = true;
      })
      .addCase(archivedMails.fulfilled, (state, action) => {
        const { id, email } = action.payload;
        let moved = false;

        //archive
        ["inbox", "sent"].forEach((box) => {
          const mail = state[box].find((m) => m._id === id);
          if (mail) {
            mail.archived = true;
            state[box] = state[box].filter((m) => m._id !== id);
            state.archived.push(mail);
            moved = true;
          }
        });
        if (!moved) {
          //unarchived
          const mail = state.archived.find((m) => m._id === id);
          if (mail) {
            mail.archived = false;
            state.archived = state.archived.filter((m) => m._id !== id);
            if (mail.from === email) state.sent.push(mail);
            else state.inbox.push(mail);
          }
        }

        state.loading = false;
      })
      .addCase(archivedMails.rejected, (state) => {
        state.loading = false;
      })
      //@desc Trash/ restore email --> done --> works
      .addCase(trashMails.pending, (state) => {
        state.loading = true;
      })
      .addCase(trashMails.fulfilled, (state, action) => {
        const { id, email } = action.payload;
        let moved = false;

        //trash
        ["inbox", "sent", "archived"].forEach((box) => {
          const mail = state[box].find((m) => m._id === id);
          if (mail) {
            mail.deleted = true;
            state[box] = state[box].filter((m) => m._id !== id);
            state.trash.push(mail);
            moved = true;
          }
        });

        //restore
        if (!moved) {
          const mail = state.trash.find((m) => m._id === id);
          if (mail) {
            mail.deleted = false;
            state.trash = state.trash.filter((m) => m._id !== id);
            if (mail.archived) state.archived.push(mail);
            else if (mail.from === email) state.sent.push(mail);
            else state.inbox.push(mail);
          }
        }

        state.loading = false;
      })
      .addCase(trashMails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearMails, addNewInboxMail } = emailSlice.actions;
export default emailSlice.reducer;
