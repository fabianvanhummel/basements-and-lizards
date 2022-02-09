import React from "react";
import { Toggle } from "./Toggle";

export default {
  title: "Components/Toggle",
};

const ToggleTemplate = (args) => <Toggle {...args} />;

export const TogglePrimary = ToggleTemplate.bind({});
TogglePrimary.args = {
  isToggled: false,
};
