// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  isAuthenticated: !!localStorage.getItem("loggedInUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const newUser = action.payload;
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user already exists
      const userExists = existingUsers.find(
        (user) => user.email === newUser.email
      );

      // If not, add new user to users array
      if (!userExists) {
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }

      // Save current session user
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      state.user = newUser;
      state.isAuthenticated = true;
    },

    signOut: (state) => {
      localStorage.removeItem("loggedInUser");

      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
