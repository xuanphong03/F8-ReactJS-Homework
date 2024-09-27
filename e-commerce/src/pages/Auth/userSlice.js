import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userApi from "~/apis/userApi";
import { StorageKeys } from "~/constants/storage-key";

// First, create the thunk
export const login = createAsyncThunk("user/login", async (payload) => {
  try {
    const data = await userApi.login(payload);
    const {
      data: { apiKey },
    } = data;
    toast.success("Đăng nhập thành công");
    // save data to session storage
    sessionStorage.setItem(StorageKeys.ACCESS_TOKEN, apiKey);
    sessionStorage.setItem(StorageKeys.USER, JSON.stringify(payload));
    return {
      data: payload,
    };
  } catch (error) {
    throw new Error("Failed to login");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(sessionStorage.getItem(StorageKeys.USER)) || {},
  },
  reducers: {
    logout(state) {
      // clear session storage
      state.data = {};
      sessionStorage.clear(StorageKeys.ACCESS_TOKEN);
      sessionStorage.clear(StorageKeys.USER_EMAIL);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload?.data;
    });
  },
});

const { actions, reducer } = userSlice;
export default reducer;
export const { logout } = actions;
