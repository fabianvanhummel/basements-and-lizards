import React from "react";
import { BMApp } from "./BMApp";
import maze from "../books/maze.json";

export default {
  title: "Pages/BMApp",
  component: BMApp,
};

const Template = (args) => <BMApp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  book: maze,
};
