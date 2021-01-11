import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const getGoals = createAsyncThunk("goals/get", async (thunkAPI) => {
  // call the api for get /goals
  try {
    const response = await Axios.get("/goals");
    return response.data;
  } catch (error) {
    const { rejectWithValue } = thunkAPI;
    return rejectWithValue(error.response.data);
  }
});

const initGoalsState = {
  goalsList: [],
  loading: "idle",
  error: null,
};

const goalsSlice = createSlice({
  name: "goals",
  initialState: initGoalsState,
  reducers: {},
  extraReducers: {
    [getGoals.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [getGoals.fulfilled]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.goalsList = action.payload;
      }
    },
    [getGoals.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },
  },
});

export default goalsSlice.reducer;
