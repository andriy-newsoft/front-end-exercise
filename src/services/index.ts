import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../utill/constants";
import { cacher } from "./cache";
import { RootState } from "../store/types";

export const rtkQuery = createApi({
  reducerPath: "rtkReducer",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const access_token = (getState() as RootState).user.accessToken;

      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }

      return headers;
    },
  }),
  tagTypes: Object.values(cacher.tags),
  endpoints: () => ({}),
});
