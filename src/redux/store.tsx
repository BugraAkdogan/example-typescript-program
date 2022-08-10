import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import patientReducer from "./slices/patientsSlice";
import patientLabReducer from "./slices/patientLabSlice";
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    patientList: patientReducer,
    selectedPatientLabs: patientLabReducer,
    filteredPatientLabs: patientLabReducer,
    todoList: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
