import React, { FC } from "react";
import { Button as Press } from "@mui/material";
interface ButtonProps {
  onClick?: () => void;
  text: string;
  type: "submit" | "button";
}
export const Button: FC<ButtonProps> = ({ onClick, text, type = "button" }) => {
  return (
    <Press
      onClick={onClick}
      variant="contained"
      fullWidth
      type={type}
      sx={{
        marginTop: "50px",
        backgroundColor: "#BAA182",
        ":hover": { backgroundColor: "#BAA182" },
        color: "#000000",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "500",
      }}
    >
      {text}
    </Press>
  );
};
