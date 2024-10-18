import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storageKeys } from "../../constants/storage-keys";
import taskApi from "../../apis/taskApi";
import { REQUEST_STATUS } from "../../constants/request-status";
import { toast } from "react-toastify";

const initialState = {
  columns: JSON.parse(localStorage.getItem(storageKeys.COLUMNS)) || [],
  tasks: JSON.parse(localStorage.getItem(storageKeys.TASKS)) || [],
  status: REQUEST_STATUS.IDLE,
};

export const getTasksMiddleware = createAsyncThunk(
  "trello/getTasks",
  async () => {
    try {
      const response = await taskApi.get();
      return response.data;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }
);

export const postTaskMiddleware = createAsyncThunk(
  "trello/postTask",
  async (payload) => {
    try {
      const response = await taskApi.post(payload);
      return response.data;
    } catch (error) {
      throw new Error("Failed to post task");
    }
  }
);

export const updateTaskMiddleware = createAsyncThunk(
  "trello/update",
  async (payload) => {
    try {
      const response = await taskApi.post(payload);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update task");
    }
  }
);

export const deleteTaskMiddleware = createAsyncThunk(
  "trello/deleteTask",
  async (payload) => {
    try {
      const response = await taskApi.post(payload);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete task");
    }
  }
);

export const trelloSlice = createSlice({
  name: "trello",
  initialState,
  reducers: {
    addColumn(state, action) {
      const newColumn = action.payload;
      state.columns.push(newColumn);
    },
    addTask(state, action) {
      const newTask = action.payload;
      state.tasks.push(newTask);
    },
    deleteTask(state, action) {
      const id = action.payload;
      const newTasks = state.tasks.filter((task) => task._id !== id);
      state.tasks = newTasks;
    },
    deleteColumn(state, action) {
      const columnId = action.payload;
      const newColumns = state.columns.filter((col) => col.column !== columnId);
      state.columns = newColumns;
    },
    updateColumnName(state, action) {
      const { columnId, columnName } = action.payload;
      const newTasks = state.tasks.map((t) =>
        t.column === columnId ? { ...t, columnName } : t
      );
      const newColumns = state.columns.map((c) =>
        c.column === columnId ? { ...c, columnName } : c
      );
      state.tasks = newTasks;
      state.columns = newColumns;
    },
    updateTaskContent(state, action) {
      const { column, content } = action.payload;
      const tasks = state.tasks;
      const targetTask = tasks.find((t) => t.column === column);
      if (targetTask) {
        targetTask.content = content;
        state.tasks = tasks;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksMiddleware.fulfilled, (state, action) => {
      const { tasks, columns } = action.payload;
      state.tasks = tasks;
      state.columns = columns;
      localStorage.setItem(storageKeys.TASKS, JSON.stringify(tasks));
      localStorage.setItem(storageKeys.COLUMNS, JSON.stringify(columns));
    });
    builder.addCase(postTaskMiddleware.pending, (state) => {
      state.status = REQUEST_STATUS.PENDING;
    });
    builder.addCase(postTaskMiddleware.fulfilled, (state, action) => {
      const { tasks, columns } = action.payload;
      localStorage.setItem(storageKeys.TASKS, JSON.stringify(tasks));
      localStorage.setItem(storageKeys.COLUMNS, JSON.stringify(columns));
      state.status = REQUEST_STATUS.IDLE;
      toast.success("Thêm mới thành công");
    });
    builder.addCase(updateTaskMiddleware.pending, (state) => {
      state.status = REQUEST_STATUS.PENDING;
    });
    builder.addCase(updateTaskMiddleware.fulfilled, (state, action) => {
      const { tasks, columns } = action.payload;
      localStorage.setItem(storageKeys.TASKS, JSON.stringify(tasks));
      localStorage.setItem(storageKeys.COLUMNS, JSON.stringify(columns));
      state.status = REQUEST_STATUS.IDLE;
      toast.success("Cập nhật thành công");
    });
    builder.addCase(deleteTaskMiddleware.pending, (state) => {
      state.status = REQUEST_STATUS.PENDING;
    });
    builder.addCase(deleteTaskMiddleware.fulfilled, (state, action) => {
      const { tasks, columns } = action.payload;
      localStorage.setItem(storageKeys.TASKS, JSON.stringify(tasks));
      localStorage.setItem(storageKeys.COLUMNS, JSON.stringify(columns));
      state.status = REQUEST_STATUS.IDLE;
      toast.success("Xóa thành công");
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addColumn,
  addTask,
  deleteTask,
  deleteColumn,
  updateColumnName,
  updateTaskContent,
} = trelloSlice.actions;

export default trelloSlice.reducer;
