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
  book: {
    items: {
      1: {
        name: Faker.commerce.productName(),
        description: Faker.commerce.productDescription(),
      },
      2: {
        name: Faker.commerce.productName(),
        description: Faker.commerce.productDescription(),
      },
      3: {
        name: Faker.commerce.productName(),
        description: Faker.commerce.productDescription(),
        events: [1, 2],
      },
    },
    events: {
      1: {
        name: Faker.lorem.word(),
        description: Faker.lorem.words(),
        reqMet: true,
        message: Faker.lorem.sentences(),
      },
      2: {
        name: Faker.lorem.word(),
        description: Faker.lorem.words(),
        reqMet: true,
        message: Faker.lorem.sentences(),
      },
    },
  },
  stateObject: {
    gameState: {
      locationIdState: 1,
      changeLog: null,
      happenedEvents: [],
      inventoryItems: [1,2,3],
    },
    setGameState: () => {} 
  },
};
