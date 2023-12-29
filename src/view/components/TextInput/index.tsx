import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { FC } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { FieldError } from "react-hook-form";

interface TextInputProps {
  value: string;
  type?: "input" | "password";
  onChange: (value: string) => void;
  label: string;
  error?: FieldError | undefined;
  errorMessage?: string | undefined;
}
export const TextInput: FC<TextInputProps> = ({
  value,
  type = "input",
  onChange,
  label,
  error,
  errorMessage,
  ...props
}) => {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <InputLabel
        htmlFor={label}
        sx={{
          fontSize: 14,
          color: error || errorMessage ? "#BA1A1A" : "#4D4D4D",
        }}
      >
        {label}
      </InputLabel>
      <TextField
        id={label}
        sx={{
          borderColor: "#4D4D4D",
          borderWidth: "1px",
          width: "100%",
        }}
        error={!!error || !!errorMessage}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment:
            error || errorMessage ? (
              <InputAdornment position="end">
                <ErrorOutlineIcon sx={{ color: "red" }} />
              </InputAdornment>
            ) : null,
        }}
        {...props}
      />
      {error && !errorMessage && (
        <Typography sx={{ fontSize: 15, color: "#BA1A1A", marginTop: "8px" }}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
};
