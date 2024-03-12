import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Users/apiSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
