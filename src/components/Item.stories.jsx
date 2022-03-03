import React from "react";
import Faker from "faker";
import { Item } from "./Item";

export default {
  title: "Components/Item",
  component: Item,
};

const Template = (args) => <Item {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isPresent: true,
  reqMet: true,
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  handleAction: () => {},
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  isPresent: true,
  reqMet: false,
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  handleAction: () => {},
};
