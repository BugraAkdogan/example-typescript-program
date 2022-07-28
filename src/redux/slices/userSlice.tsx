import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../data";

type UserSliceState = {
  loading: boolean;
  data: User;
};

const initialState: UserSliceState = {
  loading: false,
  data: {
    NAME: "None",
    POSITION: "None",
    PHYSICIAN: "None",
    PID: 0,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const { setUser, toggleLoading } = userSlice.actions;
export default userSlice.reducer;
