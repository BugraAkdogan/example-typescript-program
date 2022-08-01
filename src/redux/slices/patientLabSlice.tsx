import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Lab } from "../../data";

type PatientLabSlice = {
  loading: boolean;
  patientLabs: Array<Lab>;
  filteredLabs: Array<Lab>;
};

const initialState: PatientLabSlice = {
  loading: false,
  patientLabs: [],
  filteredLabs: [],
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
    setFilteredLabs: (state, action: PayloadAction<Array<Lab>>) => {
      state.filteredLabs = action.payload;
    },
  },
});

export const { toggleLoading, setPatientLabs, setFilteredLabs } =
  patientLabSlice.actions;
export default patientLabSlice.reducer;
