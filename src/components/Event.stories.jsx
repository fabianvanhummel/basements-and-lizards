import React from "react";
import Faker from "faker";
import { Event } from "./Event";

export default {
  title: "Components/Event",
  component: Event,
};

const Template = (args) => <Event {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: Faker.lorem.word(),
  description: Faker.lorem.words(),
  reqMet: true,
  message: Faker.lorem.sentences(),
  addEvent: () => {},
};

export const reqNotMet = Template.bind({});
reqNotMet.args = {
  name: Faker.lorem.word(),
  description: Faker.lorem.words(),
  reqMet: false,
  message: Faker.lorem.sentences(),
  addEvent: () => {},
};

export const didHappen = Template.bind({});
didHappen.args = {
  name: Faker.lorem.word(),
  description: Faker.lorem.words(),
  reqMet: true,
  didHappen: true,
  message: Faker.lorem.sentences(),
  addEvent: () => {},
};
