import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import apiClient from "../api/apiClient";
import apiClient from "../api/apiClient";
console.log("email");

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
        console.log(email);
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
        state.loading = true;
      })
      .addCase(fetchMails.rejected, (state) => {
        state.loading = true;
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
    // old functions
    // .addCase(fetchMails.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchMails.fulfilled, (state, action) => {
    //   const { receive_mails, sent_mails, archived_mails } = action.payload;

    //   state.all = [...receive_mails, ...sent_mails, ...archived_mails]; // merge all mail
    //   state.all == // remove duplicate
    //     state.all.filter(
    //       (mail, idx, self) =>
    //         idx === self.findIndex((m) => m._id === mailSlice._id)
    //     );
    //   // filter inbox mail
    //   state.inbox = receive_mails.filter((m) => m.deleted == false);
    //   // filter starred mail
    //   state.starred = [
    //     ...receive_mails.filter(
    //       (m) => m.starred == true && m.deleted == false
    //     ),
    //     ...sent_mails.filter((m) => m.starred == true && m.deleted == false),
    //     ...archived_mails.filter(
    //       (m) => m.starred == true && m.deleted == false
    //     ),
    //   ];
    //   // filter trash mail
    //   state.trash = [
    //     ...receive_mails.filter((m) => m.deleted == true),
    //     ...sent_mails.filter((m) => m.deleted == true),
    //     ...archived_mails.filter((m) => m.deleted == true),
    //   ];
    //   // filter sent mail
    //   state.sent = sent_mails.filter((m) => m.deleted == false);
    //   // filter archived mail
    //   state.archived = archived_mails.filter((m) => m.deleted == false);

    //   state.loading = false;
    // })
    // .addCase(fetchMails.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload || "Failed to fetch mails";
    // })
    // // for trash mail
    // .addCase(trashMails.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(trashMails.fulfilled, (state, action) => {
    //   const { id, mail } = action.payload;
    //   // filter from receive_mails
    //   const isFound = (id, type) => {
    //     if (type == "inbox") return state.inbox.find((m) => m._id === id);
    //     if (type == "sent") return state.sent.find((m) => m._id === id);
    //     return state.archived.find((m) => m._id === id);
    //   };

    //   if (isFound(id, "inbox")) {
    //     const imail = state.inbox.find((m) => m._id === id);
    //     imail.deleted = true;
    //     state.trash.push(imail);
    //     state.inbox = state.inbox.filter((m) => m._id !== id);
    //   }
    //   // filter from sent_mails
    //   else if (isFound(id, "sent")) {
    //     const smail = state.sent.find((m) => m._id === id);
    //     smail.deleted = true;
    //     state.trash.push(smail);
    //     state.inbox = state.sent.filter((m) => m._id !== id);
    //   }
    //   // filter from archeived_mails
    //   else if (isFound(id, "archived")) {
    //     const tmail = state.archived.find((m) => m._id === id);
    //     tmail.deleted = true;
    //     state.trash.push(tmail);
    //     state.inbox = state.archived.filter((m) => m._id !== id);
    //   }
    //   //restore from trash
    //   else {
    //     const restore = state.trash.find((m) => m._id == id);
    //     restore.deleted = false;
    //     state.trash = state.trash.filter((m) => m._id !== id);
    //     if (restore.from == mail) state.sent.push(restore);
    //     else state.inbox.push(restore);
    //   }

    //   state.loading = false;
    // })
    // .addCase(trashMails.rejected, (state) => {
    //   console.log("trash mail rejected........");
    //   state.loading = false;
    //   state.error = null;
    // })
    // // mark read/unread mail
    // .addCase(readMails.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(readMails.fulfilled, (state, action) => {
    //   const { id } = action.payload;

    //   const imail = state.inbox.find((m) => m._id === id);
    //   if (imail) imail.read = !imail.read;

    //   const smail = state.sent.find((m) => m._id === id);
    //   if (smail) smail.read = !smail.read;

    //   const amail = state.archived.find((m) => m._id === id);
    //   if (amail) amail.read = !amail.read;

    //   state.loading = false;
    // })
    // .addCase(readMails.rejected, (state) => {
    //   state.loading = false;
    //   state.error = null;
    // })
    // // mark starred/unstarred mail
    // .addCase(starredMails.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(starredMails.fulfilled, (state, action) => {
    //   const { id } = action.payload;
    //   const imail = state.inbox.find((m) => m._id === id);
    //   if (imail) {
    //     if (imail.starred) {
    //       imail.starred = !imail.starred;
    //       state.starred = state.starred.filter((m) => m._id !== id);
    //     } else {
    //       imail.starred = !imail.starred;
    //       state.starred.push(imail);
    //     }
    //   }
    //   const smail = state.sent.find((m) => m._id === id);
    //   if (smail) {
    //     if (smail.starred) {
    //       smail.starred = !smail.starred;
    //       state.starred = state.starred.filter((m) => m._id !== id);
    //     } else {
    //       smail.starred = !smail.starred;
    //       state.starred.push(smail);
    //     }
    //   }
    //   const amail = state.archived.find((m) => m._id === id);
    //   if (amail) {
    //     if (amail.starred) {
    //       amail.starred = !amail.starred;
    //       state.starred = state.starred.filter((m) => m._id !== id);
    //     } else {
    //       amail.starred = !amail.starred;
    //       state.starred.push(amail);
    //     }
    //   }
    //   state.loading = false;
    // })
    // .addCase(starredMails.rejected, (state) => {
    //   state.loading = false;
    //   state.error = null;
    // })

    // //archived mails
    // .addCase(archivedMails.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(archivedMails.fulfilled, (state, action) => {
    //   const { id, mail } = action.payload;
    //   //unarchived mails
    //   const amail = state.archived.filter((m) => m._id === id);
    //   if (amail) {
    //     state.archived = state.archived.filter((m) => m._id !== id);
    //     if (mail == amail?.from) state.sent.push(amail);
    //     else state.inbox.push(amail);
    //   }

    //   // archived inbox mail
    //   const imail = state.inbox.filter((m) => m._id === id);
    //   if (imail) {
    //     state.inbox = state.inbox.filter((m) => m._id !== id);
    //     state.archived.push(imail);
    //   }
    //   // archived sent mail
    //   const smail = state.inbox.filter((m) => m._id === id);
    //   if (smail) {
    //     state.inbox = state.inbox.filter((m) => m._id !== id);
    //     state.archived.push(smail);
    //   }

    //   state.loading = false;
    // })
    // .addCase(archivedMails.rejected, (state) => {
    //   state.loading = false;
    //   state.error = null;
    // });
  },
});

export const { clearMails, addNewInboxMail } = emailSlice.actions;
export default emailSlice.reducer;
