import { createSlice } from "@reduxjs/toolkit";

export interface UserTypes {
  email: string;
}

const initialState = {
  loggedInUser: {
    email: "",
  } as UserTypes,
};

export const UserSlice = createSlice({
  name: "UserData",
  initialState,
  reducers: {
    updateUserInStoreAfterAuth: (state, action: { payload: UserTypes }) => {
      state.loggedInUser = {
        email: action.payload.email,
      };
    },
    updateUserInStoreafterLogout: (state, action: { payload: UserTypes }) => {
      state.loggedInUser = {
        email: action.payload.email,
      };
    },
  },
});

export const { updateUserInStoreAfterAuth, updateUserInStoreafterLogout } =
  UserSlice.actions;

export default UserSlice.reducer;
