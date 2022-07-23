import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../data";

const initialState = {
  name: "",
  position: "",
  physician: "",
  pid: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.name = "";
      state.position = "";
      state.physician = "";
      state.pid = 0;
    },
    setUser: (state, action: PayloadAction<User>) => {
      console.log(action.payload.NAME);
      state.name = action.payload.NAME;
      state.position = action.payload.POSITION;
      state.physician = action.payload.PHYSICIAN;
      state.pid = action.payload.PID;
    },
  },
  extraReducers: () => {},
});

export const { reset, setUser } = userSlice.actions;
export default userSlice.reducer;
