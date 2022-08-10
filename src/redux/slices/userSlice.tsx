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
    resetUser: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { setUser, toggleLoading, resetUser } = userSlice.actions;
export default userSlice.reducer;
