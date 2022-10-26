import React from "react";
import Faker from "faker";
import { Npc } from "./Npc";

export default {
  title: "Components/Npc",
  component: Npc,
};

const Template = (args) => <Npc {...args} />;

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
