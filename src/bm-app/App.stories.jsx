import React from "react";
import { App } from "./App";
import maze from "../books/maze.json";
import goofyGroceries from "../books/goofyGroceries.json";

export default {
  title: "BM App/App",
  component: App,
};

const Template = (args) => <App {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  book: goofyGroceries,
};
