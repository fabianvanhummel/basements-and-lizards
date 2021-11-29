import React from "react";
import { BMApp } from "./BMApp";
import maze from "../books/maze.json";

export default {
  title: "BM App/BMApp",
  component: BMApp,
};

const Template = (args) => <BMApp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  book: maze,
};
