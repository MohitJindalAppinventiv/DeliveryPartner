import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signupSlice";
import authReducer from "./authSlice";
import earnings from "./earningSlice"
import forgotPasswordReducer from './forgotPasswordSlice';
import profileReducer from './ProfileSlice';
import deliveryReducer from './deliverySlice';
export const store = configureStore({
  reducer: {
    signUpReducer,
    auth: authReducer,
    earnings,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    delivery:deliveryReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
