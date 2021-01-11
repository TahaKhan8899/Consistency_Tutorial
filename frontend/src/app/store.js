import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "components/Goals/GoalsSlice";

export default configureStore({
  reducer: {
    goals: goalsReducer,
  },
});
