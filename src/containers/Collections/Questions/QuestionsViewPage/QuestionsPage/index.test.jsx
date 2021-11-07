import React from "react";

import ShallowRenderer from "react-test-renderer/shallow";
import QuestionsPage from ".";

const renderer = new ShallowRenderer();

describe("QuestionsPage Component", () => {
  test("should match the snapshot", () => {
    renderer.render(<QuestionsPage />);
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });
});
