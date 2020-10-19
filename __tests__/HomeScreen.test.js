import React from "react";
import renderer, { act } from "react-test-renderer";
import HomeScreen from "../screens/HomeScreen";
import templates from "../templates";

describe("<HomeScreen />", () => {
  it("Homescreen has 1 child", async () => {
    jest.useFakeTimers();
    let tree;

    await act(async () => {
      tree = renderer.create(
        <HomeScreen route={{ params: { template: templates[0] } }} />
      );
    });
    tree = tree.toJSON();

    expect(tree.children.length).toBe(1);
  });

});
