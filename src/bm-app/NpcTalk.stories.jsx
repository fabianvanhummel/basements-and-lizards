import React from "react";
import Faker from "faker";
import { NpcTalk } from "./NpcTalk";

export default {
  title: "Components/NpcTalk",
  component: NpcTalk,
};

const Template = (args) => <NpcTalk {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  reqMet: true,
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
  options: [
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      reqMet: true,
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      events: ["1"],
      reqMet: true,
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      items: ["2"],
      reqMet: true,
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      reqMet: false,
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      reqMet: false,
    },
  ],
  handleAction: () => {},
};
