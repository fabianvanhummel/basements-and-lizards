import React from "react";
import Faker from "faker";
import { Inventory } from "./Inventory";

export default {
  title: "Components/Inventory",
  component: Inventory,
};

const Template = (args) => <Inventory {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  items: Array(2)
    .fill()
    .map(() => ({
      name: Faker.commerce.productName(),
      description: Faker.commerce.productDescription(),
    })).concat(
      Array(2)
      .fill()
      .map(() => ({
        name: Faker.commerce.productName(),
        description: Faker.commerce.productDescription(),
        events: Array(3)
          .fill()
          .map(() => ({
            name: Faker.lorem.word(),
            description: Faker.lorem.words(),
            didHappen: Faker.datatype.boolean(),
            message: Faker.lorem.sentences(),
          })),
      }))
    ),
  addEvent: () => {},
};
