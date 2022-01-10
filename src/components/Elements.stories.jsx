import React from "react";
import Faker from "faker";
import { ElementList } from "./Elements";

export default {
  title: "Components/Elements",
  component: ElementList,
};

const Template = (args) => <ElementList {...args} />;

export const PrimaryEvents = Template.bind({});
// Note: this is not what the actual data structure is like.
PrimaryEvents.args = {
  elementType: "Events",
  elements: Array(5)
    .fill()
    .map(() => ({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      didHappen: Faker.datatype.boolean(),
      message: Faker.lorem.sentences(),
      reqMet: Faker.datatype.boolean(),
      showBlocked: Faker.datatype.boolean(),
      addEvent: () => {}
    })),
};
/*
  items: Array(3)
    .fill()
    .map(() => ({
      isPresent: Faker.datatype.boolean(),
      name: Faker.commerce.productName(),
      description: Faker.commerce.productDescription(),
    })),
  npcs: Array(2)
    .fill()
    .map(() => ({
      name: Faker.name.findName(),
      description: Faker.lorem.sentences(),
    })),
  paths: Array(4)
    .fill()
    .map(() => ({
      reqMet: Faker.datatype.boolean(),
      toLocationId: Faker.lorem.word(),
      name: Faker.address.city(),
      description: Faker.lorem.sentences(),
      showBlocked: Faker.datatype.boolean(),
    })),
  setLocation: () => {},
  addEvent: () => {},
  addItem: () => {},
  toggleShowBlockedState: () => {},
};
*/
/*
export const Empty = Template.bind({});
Empty.args = {
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
  toggleShowBlockedState: () => {},
};
*/