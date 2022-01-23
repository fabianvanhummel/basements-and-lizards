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
    location: maze["initialLocation"],
    pastEvents: ['event1', 'event2', 'event3'],
    inventoryItems: ['item1', 'item2', 'item3'],
  },
};
