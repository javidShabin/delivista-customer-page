import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  name?: string;
  email?: string;
  // Add any other user fields here
}

interface UserState {
  isUserExist: boolean;
  user: User;
}

const initialState: UserState = {
  isUserExist: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.isUserExist = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.isUserExist = false;
      state.user = {};
    },
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
