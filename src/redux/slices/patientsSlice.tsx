import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { CclReturnData, getPatientsData, Patient } from "../../data";

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

// export const getPatientsListAsync = () => {
//   getPatientsData(1)
//     .then((result) => {
//       const { error, msg } = validateGetPatients(result);
//       if (error) {
//         console.error("No Result");
//         return;
//       } else {
//         // setUser(result.DATA[0]);
//         return { result };
//         // console.log(result.DATA[0]);
//       }
//     })
//     .then((err) => console.error(err));
// };

export const getPatientsListAsync = createAsyncThunk(
  "patients/getPatientsListAsync",
  async (dispatch, getState) => {
    return getPatientsData(1).then((result) => result.DATA);
  }
);

function validateGetPatients(res: CclReturnData<Patient>): {
  error: boolean;
  msg?: string;
} {
  // console.log(res.META);
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the patients" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the patients" };
  }
  // if (res.DATA.length > 1) {
  //   return {
  //     error: true,
  //     msg: "more than one user was found; was expecting only one",
  //   };
  // }
  return { error: false };
}

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
