import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userApi } from "../../../services/rtkQuery/user";

import { UserState } from "./types";
import { UserModel } from "../../../models/user";

export const initialState: UserState = {
  user: null,
  accessToken: "",
  notification: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setUser(state, action: PayloadAction<UserModel | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.accessToken = "";
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }: any) => {
          state.user = payload.user;
          state.accessToken = payload.accessToken;
        }
      )
      .addMatcher(
        userApi.endpoints.notifications.matchFulfilled,
        (state, { payload }: any) => {
          state.notification = payload[0];
        }
      );
  },
});

export const userReducer = userSlice.reducer;
export const { setAuth, setUser, logout } = userSlice.actions;
