import React from "react";
import { LocationTab } from "./LocationTab";

export default {
  title: "BM App/LocationTab",
  component: LocationTab,
};

const Template = (args) => <LocationTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  toggleShowBlockedState: null,
  book: {
    locations: {
      1: {
        name: null,
      },
    },
  },
  gameState: {
    locationIdState: 1,
    changeLog: null,
    happenedEvents: [],
    inventoryItems: [],
  },
  setGameState: () => {},
};
