import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import patientReducer from "./slices/patientsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    patient: patientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
