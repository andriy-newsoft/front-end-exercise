import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./view/pages/Auth/Login"; // Adjust the import path as necessary
import { useForm } from "react-hook-form";

// Mock the useLogin hook
jest.mock("./hooks/useLogin", () => {
  const originalModule = jest.requireActual("./hooks/useLogin");
  return {
    __esModule: true,
    ...originalModule,
    useLogin: () => ({
      control: useForm().control,
      errors: {},
      handleSubmit: jest.fn((fn) => fn), // Mock handleSubmit
      errorMessage: "",
    }),
  };
});

describe("Login Component", () => {
  const handleSubmitMock = jest.fn(); // Mock handleSubmit callback

  beforeEach(() => {
    handleSubmitMock.mockClear();
    render(<Login />);
  });

  it("renders the login form", () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("submits form with email and password", async () => {
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      // Check if handleSubmit was called
      expect(handleSubmitMock).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  // Add more tests as needed...
});
