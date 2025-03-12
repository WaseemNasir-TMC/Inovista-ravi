import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { IafPassSvc } from "@dtplatform/platform-api";

// Redux User Settings Slice
export const myUserSlice = createSlice({
  name: "myUser",
  initialState: {
    myUser: null,
  },
  reducers: {
    clearUser: (state, action) => {
      state.myUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state, action) => {
        console.log("<---Retrieving User from Twinit--->");
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (action?.payload) state.myUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.error("<---ERROR: Retrieving User from Twinit!--->");
      });
  },
});

export const getCurrentUser = createAsyncThunk(
  "user/getCurrent",
  async (args, thunkApi) => {
    if (!thunkApi.getState().myUser.myUser) {
      return await IafPassSvc.getCurrentUser();
    } else {
      return null;
    }
  }
);

export const { clearUser } = myUserSlice.actions;

export default myUserSlice.reducer;
