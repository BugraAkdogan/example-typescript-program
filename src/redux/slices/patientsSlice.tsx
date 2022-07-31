import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Patient } from "../../data";

type PatientSlice = {
  loading: boolean;
  patients: Array<Patient>;
  selectedPatient: number;
};

const initialState: PatientSlice = {
  loading: false,
  patients: [],
  selectedPatient: 0,
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
    setSelectedPatient: (state, action: PayloadAction<number>) => {
      state.selectedPatient = action.payload;
    },
  },
});

export const { toggleLoading, setPatients, setSelectedPatient } =
  patientsSlice.actions;
export default patientsSlice.reducer;
