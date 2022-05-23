import React from "react";
import Faker from "faker";
import { ThingInteract } from "./ThingInteract";

export default {
  title: "Components/ThingInteract",
  component: ThingInteract,
};

const Template = (args) => <ThingInteract {...args} />;

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
