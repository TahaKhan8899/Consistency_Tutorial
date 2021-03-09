import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const getGoals = createAsyncThunk(
  "goals/get",
  async (userInfo, thunkAPI) => {
    // call the api for get /goals
    try {
      const { token } = userInfo;
      const response = await Axios.get("/goals", {
        headers: { Authorization: "Bearer " + token },
      });
      return response.data;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/create",
  async (payload, thunkAPI) => {
    try {
      const { token, goalName, goalID } = payload;
      if (!goalID) {
        await Axios.post(
          "/goals/create",
          { goalName },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
      } else {
        await Axios.put(
          "/goals/update/" + goalID,
          { goalName },
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
      }
      const { dispatch } = thunkAPI;
      dispatch(getGoals(payload));
      return;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (payload, thunkAPI) => {
    try {
      const { token, goalID } = payload;
      await Axios.delete("/goals/delete/" + goalID, {
        headers: { Authorization: "Bearer " + token },
      });
      const { dispatch } = thunkAPI;
      dispatch(getGoals(payload));
      return;
    } catch (error) {
      const { rejectWithValue } = thunkAPI;
      return rejectWithValue(error.response.data);
    }
  }
);

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
        state.error = action.payload;
      }
    },
    [createGoal.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [createGoal.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
    [deleteGoal.pending]: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [deleteGoal.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.payload;
      }
    },
  },
});

export default goalsSlice.reducer;
