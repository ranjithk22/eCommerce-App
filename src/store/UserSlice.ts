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
    updateUserInStoreAfterAuth: (state, action: { payload: UserTypes }) => {
      state.user = action.payload;
    },
    updateUserInStoreafterLogout: (state) => {
      state.user = { ...state.user, email: "", userId: "" };
    },
  },
});

export const { updateUserInStoreAfterAuth, updateUserInStoreafterLogout } =
  UserSlice.actions;

export default UserSlice.reducer;
