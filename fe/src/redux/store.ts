import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import loadingReducer from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
