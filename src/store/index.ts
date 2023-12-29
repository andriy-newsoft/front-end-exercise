import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import { rtkQuery } from "../services";

import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 256 },
      serializebleCheck: false,
    }).concat(rtkQuery.middleware),
});

export const persistor = persistStore(store);
