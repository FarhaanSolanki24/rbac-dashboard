import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("rbac_user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored ? JSON.parse(stored) : null,
    token: localStorage.getItem("rbac_token") || null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("rbac_user", JSON.stringify(action.payload.user));
      localStorage.setItem("rbac_token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("rbac_user");
      localStorage.removeItem("rbac_token");
    },
    updateRole(state, action) {
      if (state.user) {
        state.user.role = action.payload;
        localStorage.setItem("rbac_user", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateRole } = authSlice.actions;
export default authSlice.reducer;
