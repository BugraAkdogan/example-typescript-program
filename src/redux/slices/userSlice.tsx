import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CclReturnData, Metadata, User } from "../../data";

const initialState: User = {
  NAME: "",
  POSITION: "",
  PHYSICIAN: "",
  PID: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.NAME = action.payload.NAME;
      state.POSITION = action.payload.POSITION;
      state.PHYSICIAN = action.payload.PHYSICIAN;
      state.PID = action.payload.PID;
    },
  },
});

export const { reset, setUser } = userSlice.actions;
export default userSlice.reducer;
