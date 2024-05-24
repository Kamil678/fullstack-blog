import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startSignIn: (state) => {
      state.loading = true;
      state.error = null;
    },

    successSignIn: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },

    failureSignIn: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    startUpdate: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startSignIn, successSignIn, failureSignIn, startUpdate, updateSuccess, updateFailure } = userSlice.actions;

export default userSlice.reducer;
