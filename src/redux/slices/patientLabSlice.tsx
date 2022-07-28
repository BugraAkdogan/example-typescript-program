import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lab } from "../../data";

type PatientLabSlice = {
  loading: boolean;
  patientLabs: Array<Lab>;
};

const initialState: PatientLabSlice = {
  loading: false,
  patientLabs: [],
};

export const patientLabSlice = createSlice({
  name: "patientLab",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    setPatientLabs: (state, action: PayloadAction<Array<Lab>>) => {
      state.patientLabs = action.payload;
    },
  },
});

export const { toggleLoading, setPatientLabs } = patientLabSlice.actions;
export default patientLabSlice.reducer;
