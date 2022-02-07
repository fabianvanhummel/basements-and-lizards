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
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      events: ["1"],
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      items: ["2"],
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      requirements: [{ type: "EVENT_DID_HAPPEN", id: "1" }],
    },
    {
      text: Faker.lorem.words(),
      response: Faker.lorem.sentence(),
      requirements: [{ type: "ITEM_IN_INVENTORY", id: "2" }],
    },
  ],
  handleAction: () => {},
};
