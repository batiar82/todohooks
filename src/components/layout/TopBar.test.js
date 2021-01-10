import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TopBar from "./TopBar";
describe("Top Bar", () => {
  it("renders a top bar", () => {
      const {getByText} = render(<TopBar />);
      const headerText = getByText("React Hooks Todo List");
      expect(headerText).toBeInTheDocument();
  })
})