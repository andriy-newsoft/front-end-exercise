import { useForm } from "react-hook-form";
import { useLoginMutation } from "../services/rtkQuery/user";
import { useEffect, useState } from "react";

export interface LoginRequest {
  email: string;
  password: string;
}
export const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { error }] = useLoginMutation();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    //@ts-ignore
    if (error && error.data) {
      //@ts-ignore
      setErrorMessage(error.data);
    }
  }, [error]);
  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    errorMessage,
  };
};
