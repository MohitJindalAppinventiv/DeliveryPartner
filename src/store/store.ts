import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signupSlice";
import authReducer from "./slices/authSlice";
import earnings from "./slices/earningSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";
import profileReducer from "./slices/ProfileSlice";
import deliveryReducer from "./slices/deliverySlice";
import orderReducer from "./slices/orderSlice";
import statusReducer from "./slices/statusSlice";
import locationReducer from "./slices/locationSlice";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // localStorage

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['status'], // persist only status (or add 'orders' too if needed)
// };

// const persistedStatusReducer = persistReducer(persistConfig, statusReducer);

export const store = configureStore({
  reducer: {
    signUpReducer,
    auth: authReducer,
    earnings,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    delivery: deliveryReducer,
    orders: orderReducer,
    status: statusReducer,
    location: locationReducer,
  },
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
