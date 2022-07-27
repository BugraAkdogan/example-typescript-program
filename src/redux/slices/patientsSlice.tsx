import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Patient } from "../../data";

const initialState: Patient[] = [
  {
    PROVIDER_PID: 0,
    PID: 0,
    NAME: "",
    CDCR: "",
    EIDS: [],
    NEW_TO_PANEL: 0,
  },
];

export const patientsSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    // setPatient: (state, action: PayloadAction<Patient>) => {
    //   state.PROVIDER_PID = action.payload.PROVIDER_PID;
    //   state.PID = action.payload.PID;
    //   state.NAME = action.payload.NAME;
    //   state.CDCR = action.payload.CDCR;
    //   state.EIDS = action.payload.EIDS;
    //   state.NEW_TO_PANEL = action.payload.NEW_TO_PANEL;
    // },
    setPatient: (state, action: PayloadAction<Patient>) => {
      reset();
      state.push(action.payload);
    },
  },
  extraReducers: () => {},
});

export const { reset, setPatient } = patientsSlice.actions;
export default patientsSlice.reducer;
