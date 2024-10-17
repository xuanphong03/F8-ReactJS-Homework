import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import trelloReducer from "./slices/trelloSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trello: trelloReducer,
  },
});
