import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Users/apiSlice";
import companySlice from "../features/Business/apiSliceBusiness";

export default configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
  },
});
