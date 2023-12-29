import { UserModel } from "../../../models/user";
import { NotificationProps } from "../../../services/rtkQuery/user/types";

export interface UserAuth {
  accessToken: string;
}

export interface UserState {
  accessToken: string;
  user: UserModel | null;
  notification: null | NotificationProps;
}
