import { UserModel } from "../../../models/user";
import { UserAuth } from "../../../store/modules/user/types";

export interface AuthResponse extends UserAuth {
  user: UserModel;
}

export interface SignInVariables {
  email: string;
  password: string;
}

export interface NotificationsResponse {
  notification: NotificationProps[];
}

export interface NotificationProps {
  id: number;
  title: string;
  description: string;
  created: Date;
}
