import { createSlice } from "@reduxjs/toolkit";

export interface UserTypes {
  email: string;
  userId: string;
}

const initialState = {
  user: {
    email: "",
    userId: "",
  } as UserTypes,
};

export const UserSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    updateUserAfterAuth: (state, action: { payload: UserTypes }) => {
      state.user = action.payload;
    },
    updateUserAfterLogout: (state) => {
      state.user = { ...state.user, email: "", userId: "" };
    },
  },
});

export const { updateUserAfterAuth, updateUserAfterLogout } = UserSlice.actions;

export default UserSlice.reducer;
