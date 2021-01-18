import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

const initUserState = {
  loggedInUser: null,
  registerState: { loading: "idle", error: null, currentRequestID: undefined },
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, thunkAPI) => {
    // error handling
    const {
      loading,
      currentRequestID,
    } = thunkAPI.getState().user.registerState;
    if (loading !== "pending" || thunkAPI.requestId !== currentRequestID) {
      return;
    }

    try {
      // make API call to /register
      const response = await Axios.post("/user/register", userInfo);
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initUserState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      const { registerState } = state;
      if (registerState.loading === "idle") {
        registerState.loading = "pending";
        registerState.currentRequestID = action.meta.requestId;
      }
    },
    [registerUser.fulfilled]: (state, action) => {
      const { registerState } = state;
      if (registerState.loading === "pending") {
        registerState.loading = "idle";
        registerState.currentRequestID = undefined;
        registerState.error = null;
        state.loggedInUser = action.payload;
      }
    },
    [registerUser.rejected]: (state, action) => {
      const { registerState } = state;
      if (registerState.loading === "pending") {
        registerState.loading = "idle";
        registerState.currentRequestID = undefined;
        registerState.error = action.payload;
      }
    },
  },
});

export default userSlice.reducer;
