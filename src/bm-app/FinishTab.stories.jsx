import React from "react";
import { FinishTab } from "./FinishTab";

export default {
  title: "BM App/FinishTab",
  component: FinishTab,
};

const Template = (args) => <FinishTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  gameState: {
    pastEvents: ["event1", "event2", "event3"],
    inventoryItems: ["item1", "item2", "item3"],
  },
};
