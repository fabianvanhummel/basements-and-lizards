import React from "react";
import Faker from "faker";
import { Location } from "./Location";

export default {
  title: "Components/Location",
  component: Location,
};

const Template = (args) => <Location {...args} />;

export const Primary = Template.bind({});
// Note: this is not what the actual data structure is like.
Primary.args = {
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
  events: Array(3)
    .fill()
    .map(() => ({
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      didHappen: Faker.datatype.boolean(),
      message: Faker.lorem.sentences(),
    })),
  items: Array(3)
    .fill()
    .map(() => ({
      isPresent: Faker.datatype.boolean(),
      name: Faker.commerce.productName(),
      description: Faker.commerce.productDescription(),
    })),
  paths: Array(3)
    .fill()
    .map(() => ({
      reqMet: Faker.datatype.boolean(),
      toLocationId: Faker.lorem.word(),
      name: Faker.address.city(),
      description: Faker.lorem.sentences(),
    })),
  setLocation: () => {},
  addEvent: () => {},
  addItem: () => {},
  toggleShowBlockedState: () => {},
};

export const Empty = Template.bind({});
Empty.args = {
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
  toggleShowBlockedState: () => {},
};
