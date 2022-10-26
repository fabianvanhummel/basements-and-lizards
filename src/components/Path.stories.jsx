import React from "react";
import Faker from "faker";
import { Path } from "./Path";

export default {
  title: "Components/Path",
  component: Path,
};

const Template = (args) => <Path {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  reqMet: true,
  toLocationId: Faker.lorem.word(),
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
  handleAction: () => {},
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  reqMet: false,
  toLocationId: Faker.lorem.word(),
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
  handleAction: () => {},
};
