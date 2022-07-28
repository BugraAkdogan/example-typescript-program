import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Patient } from "../../data";

type PatientSlice = {
  loading: boolean;
  patients: Array<Patient>;
};

const initialState: PatientSlice = {
  loading: false,
  patients: [],
};

export const patientsSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    setPatients: (state, action: PayloadAction<Array<Patient>>) => {
      state.patients = action.payload;
    },
  },
});

export const { toggleLoading, setPatients } = patientsSlice.actions;
export default patientsSlice.reducer;
