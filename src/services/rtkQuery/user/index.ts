import { rtkQuery } from "../..";
import { AuthResponse, NotificationsResponse, SignInVariables } from "./types";

export const userApi = rtkQuery.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, SignInVariables>({
      query: (data) => {
        return {
          url: "/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        };
      },
    }),
    notifications: builder.query<NotificationsResponse, { id: string }>({
      query: ({ id }: { id: string }) => {
        return {
          url: `/notifications?id=${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useLazyNotificationsQuery } = userApi;
