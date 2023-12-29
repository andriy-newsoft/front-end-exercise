import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./view/pages/Home"; // Adjust the import path as necessary
import { useAppSelector } from "./store/hooks";
import { useLazyNotificationsQuery } from "./services/rtkQuery/user";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

// Mock the hooks
jest.mock("./store/hooks", () => ({
  useAppSelector: jest.fn(),
}));

const mockStore = configureMockStore();
const store = mockStore({
  // Your initial mock state
});

jest.mock("./services/rtkQuery/user", () => ({
  useLazyNotificationsQuery: jest.fn(),
}));

describe("Home Component", () => {
  const mockNotification = { description: "Test Notification" };

  beforeEach(() => {
    // Mock the useAppSelector to return the mockNotification
    //@ts-ignore
    useAppSelector.mockImplementation((selector) =>
      selector({ user: { notification: mockNotification } })
    );

    // Mock the useLazyNotificationsQuery
    //@ts-ignore
    useLazyNotificationsQuery.mockImplementation(() => [jest.fn()]);
  });

  it("renders notification description", async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/test notification/i)).toBeInTheDocument();
    });
  });

  // Add more tests as needed...
});
