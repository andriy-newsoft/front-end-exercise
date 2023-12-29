import { Box, CardMedia, Theme, Typography } from "@mui/material";
import React from "react";
import cybellumSign from "../../../../assets/images/login/cybellum-sign.svg";
import monitor from "../../../../assets/images/login/imac-dig-twins.png";
import { TextInput } from "../../../components/TextInput";
import { useLogin } from "../../../../hooks/useLogin";
import { Controller } from "react-hook-form";
import { Button } from "../../../components/Button";

const Login: React.FC = () => {
  const { control, errors, handleSubmit, errorMessage } = useLogin();

  return (
    <Box
      sx={{
        flexDirection: "row",
        display: "flex",
        paddingTop: "100px",
        paddingLeft: "100px",
        "@media screen and (max-width: 900px)": {
          flexDirection: "column",
          paddingTop: "50px",
          paddingLeft: "50px",
        },
      }}
    >
      <Box
        sx={{
          width: "50%",
          "@media screen and (max-width: 900px)": {
            width: "100%",
          },
        }}
      >
        <CardMedia
          component="img"
          alt="Cybellum"
          image={cybellumSign}
          sx={{ width: 150, marginBottom: "20px" }}
        />
        <Typography
          sx={{
            fontSize: "56px",
            fontWeight: "300",
            "@media screen and (max-width: 900px)": {
              fontSize: "30px",
            },
          }}
          variant="h1"
          component="h1"
        >
          Welcome to the Product Security Platform
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "70%" }}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is require" }}
            render={({ field }) => (
              <TextInput
                value={field.value}
                onChange={field.onChange}
                label="Username"
                error={errors.email}
                errorMessage={errorMessage}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is require" }}
            render={({ field }) => (
              <TextInput
                value={field.value}
                onChange={field.onChange}
                label="Password"
                type="password"
                error={errors.password}
                errorMessage={errorMessage}
              />
            )}
          />
          {errorMessage && (
            <Typography
              sx={{ fontSize: 15, color: "#BA1A1A", marginTop: "10px" }}
            >
              {errorMessage}
            </Typography>
          )}
          <Button text="Log In" type="submit" />
        </form>
      </Box>
      <Box
        sx={{
          width: "50%",
          "@media screen and (max-width: 900px)": {
            width: "100%",
            marginTop: "20px",
          },
        }}
      >
        <CardMedia
          component="img"
          alt="Digital Twins"
          image={monitor}
          sx={{ mt: 4, width: "80%" }}
        />
      </Box>
    </Box>
  );
};

export default Login;
