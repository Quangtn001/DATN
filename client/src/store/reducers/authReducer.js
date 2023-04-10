import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
const adminStorage = localStorage.getItem("admin-token");

function verifyToken(keyName) {
  // const storage = localStorage.getItem(keyName);
  if (adminStorage) {
    const decodeToken = jwtDecode(adminStorage);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem(keyName);
      return null;
    } else {
      return adminStorage;
    }
  } else {
    return null;
  }
}
const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    adminToken: verifyToken(),
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    logout: (state, { payload }) => {
      localStorage.removeItem(payload);
      if (payload === "admin-token") {
        state.adminToken = null;
      } else if (payload === "userToken") {
        state.userToken = null;
        state.user = null;
      }
    },
  },
});
export const { setAdminToken, logout } = authReducer.actions;
export default authReducer.reducer;
