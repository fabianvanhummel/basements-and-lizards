import React from "react";
import Faker from "faker";
import { ElementList } from "./Elements";

export default {
  title: "Components/Elements",
  component: ElementList,
};

const Template = (args) => <ElementList {...args} />;

export const PrimaryEvents = Template.bind({});
PrimaryEvents.args = {
  type: "Events",
  elements: Array(5)
    .fill()
    .map(() => ({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      didHappen: Faker.datatype.boolean(),
      message: Faker.lorem.sentences(),
      reqMet: Faker.datatype.boolean(),
      addEvent: () => {},
    })),
};

export const PrimaryItems = Template.bind({});
PrimaryItems.args = {
  type: "Items",
  elements: Array(3)
    .fill()
    .map(() => ({
      isPresent: Faker.datatype.boolean(),
      name: Faker.commerce.productName(),
      description: Faker.commerce.productDescription(),
      reqMet: Faker.datatype.boolean(),
      addItem: () => {},
    })),
};

export const PrimaryNpcs = Template.bind({});
PrimaryNpcs.args = {
  type: "Npcs",
  elements: Array(2)
    .fill()
    .map(() => ({
      name: Faker.name.findName(),
      description: Faker.lorem.sentences(),
      reqMet: Faker.datatype.boolean(),
      conversation: {
        initial: {
          npcLine: null,
          responses: [],
        },
      },
    })),
};

export const PrimaryPaths = Template.bind({});
PrimaryPaths.args = {
  type: "Paths",
  elements: Array(4)
    .fill()
    .map(() => ({
      reqMet: Faker.datatype.boolean(),
      toLocationId: Faker.lorem.word(),
      name: Faker.address.city(),
      description: Faker.lorem.sentences(),
      reqMet: Faker.datatype.boolean(),
      setLocation: () => {},
    })),
};
