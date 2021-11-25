import React from "react";
import { Story } from "./Story";
import maze from "../books/maze.json";

export default {
  title: "Pages/Story",
  component: Story,
};

const Template = (args) => <Story {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  book: maze,
};
