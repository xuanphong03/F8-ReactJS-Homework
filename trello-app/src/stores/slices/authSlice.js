import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../constants/storage-keys";
import { REQUEST_STATUS } from "../../constants/request-status";
import authApi from "../../apis/authApi";

const initialState = {
  status: REQUEST_STATUS.IDLE,
  apiKey: localStorage.getItem(storageKeys.API_KEY) || "",
};

export const login = createAsyncThunk("auth/login", async (payload) => {
  try {
    const response = await authApi.get(payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = REQUEST_STATUS.PENDING;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { apiKey } = action.payload;
      state.apiKey = apiKey;
      state.status = REQUEST_STATUS.IDLE;
      localStorage.setItem(storageKeys.API_KEY, apiKey);
    });
    builder.addCase(login.rejected, (state) => {
      state.apiKey = null;
      state.status = REQUEST_STATUS.REJECTED;
    });
  },
});

// Action creators are generated for each case reducer function

export default authSlice.reducer;
