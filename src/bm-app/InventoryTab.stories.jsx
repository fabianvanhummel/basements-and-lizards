import React from "react";
import { InventoryTab } from "./InventoryTab";

export default {
  title: "BM App/InventoryTab",
  component: InventoryTab,
};

const Template = (args) => <InventoryTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
