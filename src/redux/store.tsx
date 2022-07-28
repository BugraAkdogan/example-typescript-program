import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import patientReducer from "./slices/patientsSlice";
import patientLabReducer from "./slices/patientLabSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    patient: patientReducer,
    patientLab: patientLabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
