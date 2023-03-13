import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title element", () => {
  render(<App />);
  const linkElement = screen.getByText(/TechReturners Casino/i);
  expect(linkElement).toBeInTheDocument();
});
