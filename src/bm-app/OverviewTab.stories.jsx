import React from "react";
import Faker from "faker";
import maze from "../books/maze.json";
import { OverviewTab } from "./OverviewTab";

export default {
  title: "BM App/OverviewTab",
  component: OverviewTab,
};

const Template = (args) => <OverviewTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  book: maze,
  gameState: {
    locationIdState: maze["initialLocation"],
    changeLog: "location-swap",
    happenedEvents: ['event1', 'event2', 'event3'],
    inventoryItems: ['item1', 'item2', 'item3'],
  },
  gameStateHistory: Array(1)
    .fill()
    .map(() => [
      {
        locationIdState: maze["initialLocation"],
        changeLog: "location-swap",
        happenedEvents: Faker.commerce.productName(),
        inventoryItems: Faker.commerce.productName(),
      },
    ]),
};
