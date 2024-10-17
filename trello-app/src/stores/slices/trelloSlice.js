import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../constants/storage-keys";
import taskApi from "../../apis/taskApi";

const initialState = {
  columns: JSON.parse(localStorage.getItem(storageKeys.COLUMNS)) || [],
  tasks: JSON.parse(localStorage.getItem(storageKeys.TASKS)) || [],
};

export const getTasks = createAsyncThunk("trello/getTasks", async () => {
  try {
    const response = await taskApi.get();
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
});

export const postTask = createAsyncThunk("trello/postTask", async (payload) => {
  try {
    const response = await taskApi.post(payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
});

export const trelloSlice = createSlice({
  name: "trello",
  initialState,
  reducers: {
    addColumn(state, action) {
      const newColumn = action.payload;
      state.columns.push(newColumn);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      const { tasks, columns } = action.payload;
      state.tasks = tasks;
      state.columns = columns;
      localStorage.setItem(storageKeys.TASKS, JSON.stringify(tasks));
      localStorage.setItem(storageKeys.COLUMNS, JSON.stringify(columns));
    });
    builder.addCase(postTask.fulfilled, (state, action) => {
      const { tasks, columns } = action.payload;
      state.tasks = tasks;
      state.columns = columns;
      localStorage.setItem(storageKeys.TASKS, JSON.stringify(tasks));
      localStorage.setItem(storageKeys.COLUMNS, JSON.stringify(columns));
    });
  },
});

// Action creators are generated for each case reducer function
export const { addColumn } = trelloSlice.actions;

export default trelloSlice.reducer;
