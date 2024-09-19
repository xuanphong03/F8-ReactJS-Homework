// Redux State management tool
import { configureStore } from '@reduxjs/toolkit';

import userSlice from '~/pages/LoginPanel/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
