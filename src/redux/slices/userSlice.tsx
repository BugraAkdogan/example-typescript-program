import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../data";

type UserSliceState = {
  loading: boolean;
  data: User | undefined;
};

const initialState: UserSliceState = {
  loading: false,
  data: undefined,
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
