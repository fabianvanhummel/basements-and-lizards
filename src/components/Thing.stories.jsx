import React from "react";
import Faker from "faker";
import { Thing } from "./Thing";

export default {
  title: "Components/Thing",
  component: Thing,
};

const Template = (args) => <Thing {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  reqMet: true,
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  reqMet: false,
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
};
