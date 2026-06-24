import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { users as mockUsers } from "../data/mockData";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  await new Promise((r) => setTimeout(r, 600));
  return mockUsers;
});

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], status: "idle" },
  reducers: {
    updateUserRole(state, action) {
      const { userId, role } = action.payload;
      const user = state.list.find((u) => u.id === userId);
      if (user) user.role = role;
    },
    updateUserStatus(state, action) {
      const { userId, status } = action.payload;
      const user = state.list.find((u) => u.id === userId);
      if (user) user.status = status;
    },
    deleteUser(state, action) {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = "loading"; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      });
  },
});

export const { updateUserRole, updateUserStatus, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
