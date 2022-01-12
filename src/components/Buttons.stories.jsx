import React from "react";
import Faker from "faker";
import { DefaultButton, ButtonToggleBlocked } from "./Buttons";

export default {
  title: "Components/Buttons",
  //component: DefaultButton,
};

const DefaultButtonTemplate = (args) => <DefaultButton {...args} />;

const ButtonToggleBlockedTemplate = (args) => <ButtonToggleBlocked {...args} />;

export const DefaultButtonPrimary = DefaultButtonTemplate.bind({});
DefaultButtonPrimary.args = {
  children: Faker.lorem.words(),
  onClick: () => {},
  isDisabled: false,
};

export const ButtonToggleBlockedPrimary = ButtonToggleBlockedTemplate.bind({});
ButtonToggleBlockedPrimary.args = {
  toggleShowBlockedState: () => {},
};
