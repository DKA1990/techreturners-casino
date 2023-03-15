import React from "react";
import { screen, render } from "@testing-library/react";
import AppButton from "./AppButton";

test("render AppButton", () => {
  render(<AppButton />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});
