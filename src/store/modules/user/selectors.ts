import { createSelector, Selector } from "@reduxjs/toolkit";

import { RootState } from "../../types";

import { UserState } from "./types";

const selectSelf: Selector<RootState, UserState> = (state) => state.user;

export const selectIsAuth = createSelector(
  selectSelf,
  (state) => !!state.accessToken
);

export const selectUser = createSelector(selectSelf, (state) => {
  return state.user;
});

export const selectNotification = createSelector(selectSelf, (state) => {
  return state.notification;
});
