import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signupSlice";
import authReducer from "./authSlice";
import earnings from "./earningSlice"
export const store = configureStore({
  reducer: {
    signUpReducer,
    auth: authReducer,
    earnings
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
