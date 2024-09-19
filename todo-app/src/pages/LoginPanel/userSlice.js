import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StorageKeys } from '~/constant/storage-key';
import userApi from '~/apis/userApi';
import { toast } from 'react-toastify';

// First, create the thunk
export const login = createAsyncThunk('user/login', async (payload) => {
  try {
    const data = await userApi.login(payload);
    const {
      data: { apiKey },
    } = data;

    // save data to session storage
    sessionStorage.setItem(StorageKeys.API_KEY, apiKey);
    sessionStorage.setItem(StorageKeys.USER, JSON.stringify(payload));
    return {
      data: payload,
    };
  } catch (error) {
    throw new Error('Failed to login');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: JSON.parse(sessionStorage.getItem(StorageKeys.USER)) || {},
  },
  reducers: {
    logout(state) {
      // clear session storage
      state.data = {};
      sessionStorage.clear(StorageKeys.API_KEY);
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
