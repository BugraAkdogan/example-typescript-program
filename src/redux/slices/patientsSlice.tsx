import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Patient } from "../../data";

const initialState = {
  ppid: 0,
  pid: 0,
  name: "",
  cdcr: "",
  eids: [
    {
      eid: 0,
      type: "",
      inst: "",
      reg_dt_tm: "",
    },
  ],
  new_to_panel: 0,
};

export const patientsSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    reset: (state) => {
      state.ppid = 0;
      state.pid = 0;
      state.name = "";
      state.cdcr = "";
      state.eids = [];
      state.new_to_panel = 0;
    },
    setPatient: (state, action: PayloadAction<Patient>) => {
      //console.log(action.payload.NAME);
      state.ppid = action.payload.PROVIDER_PID;
      state.pid = action.payload.PID;
      state.name = action.payload.NAME;
      state.cdcr = action.payload.CDCR;
      state.eids = [];
      state.new_to_panel = action.payload.NEW_TO_PANEL;
    },
  },
  extraReducers: () => {},
});

export const { reset, setPatient } = patientsSlice.actions;
export default patientsSlice.reducer;
