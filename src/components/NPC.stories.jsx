import React from "react";
import Faker from "faker";
import { NPC } from "./NPC";

export default {
  title: "Components/NPC",
  component: NPC,
};

const Template = (args) => <NPC {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
};
