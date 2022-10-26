import React from "react";
import Faker from "faker";
import { Reaction } from "./Reaction";

export default {
  title: "BM App/Reaction",
  component: Reaction,
};

const Template = (args) => <Reaction {...args} />;

export const EventHappens = Template.bind({});
EventHappens.args = { type: "EVENT_HAPPENS", message: Faker.lorem.sentence() };

export const FollowPath = Template.bind({});
FollowPath.args = { type: "FOLLOW_PATH", message: Faker.lorem.sentence() };

export const ArriveAtLocation = Template.bind({});
ArriveAtLocation.args = {
  type: "ARRIVE_AT_LOCATION",
  message: Faker.lorem.sentence(),
};

export const PickUpItem = Template.bind({});
PickUpItem.args = { type: "PICK_UP_ITEM", message: Faker.lorem.sentence() };
