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

export const isPresentPrimary = Template.bind({});
isPresentPrimary.args = {
  isPresent: false,
  reqMet: true,
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  events: Array(3)
    .fill()
    .map(() => ({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      didHappen: Faker.datatype.boolean(),
      message: Faker.lorem.sentences(),
    })),
  handleAction: () => {},
};

export const isPresentEmpty = Template.bind({});
isPresentEmpty.args = {
  isPresent: false,
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
