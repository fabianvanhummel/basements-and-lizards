import React from "react";
import Faker from "faker";
import { InventoryTab } from "./InventoryTab";

export default {
  title: "BM App/InventoryTab",
  component: InventoryTab,
};

const Template = (args) => <InventoryTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  inventoryItems: Array(2)
    .fill()
    .map(() => ({
      inventoryItem: true,
      name: Faker.commerce.productName(),
      description: Faker.commerce.productDescription(),
    }))
    .concat(
      Array(2)
        .fill()
        .map(() => ({
          inventoryItem: true,
          name: Faker.commerce.productName(),
          description: Faker.commerce.productDescription(),
          events: Array(3)
            .fill()
            .map(() => ({
              name: Faker.lorem.word(),
              description: Faker.lorem.words(),
              reqMet: Faker.datatype.boolean(),
              didHappen: Faker.datatype.boolean(),
              message: Faker.lorem.sentences(),
              addEvent: () => {},
            })),
        })),
    ),
  addEvent: () => {},
};
