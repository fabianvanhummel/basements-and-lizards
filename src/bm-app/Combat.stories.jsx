import React from "react";
import Faker from "faker";
import { Combat } from "./Combat";

export default {
  title: "Components/Combat",
  component: Combat,
};

const Template = (args) => <Combat {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
  options: [
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      reqMet: true,
    },
  ],
  handleAction: () => {},
};
