import { configureStore } from "@reduxjs/toolkit";
import userReducer from "~/pages/Auth/userSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
