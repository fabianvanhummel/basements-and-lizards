import React from "react";
import Faker from "faker";
import { GameTab } from "./GameTab";

export default {
  title: "BM App/GameTab",
  component: GameTab,
};

const Template = (args) => <GameTab {...args} />;

const book = {
  initialLocation: "location-1",
  locations: {
    "location-1": {
      name: Faker.address.city(),
      description: Faker.lorem.sentence(),
      paths: [
        {
          name: Faker.address.direction(),
          description: Faker.lorem.sentence(),
          toLocationId: "location-1",
        },
      ],
      npcs: ["npc-1"],
    },
  },
  npcs: {
    "npc-1": {
      name: Faker.name.findName(),
      description: Faker.lorem.sentence(),
    },
  },
};

export const TakePath = Template.bind({});
TakePath.args = {
  book,
  gameState: { location: "location-1" },
  changeLog: {
    action: { type: "TAKE_PATH", path: { toLocationId: "location-1" } },
    reactions: [
      { type: "FOLLOW_PATH", message: `You take ${Faker.address.direction()}` },
      { type: "EVENT_HAPPENS", message: Faker.lorem.sentence() },
      {
        type: "ARRIVE_AT_LOCATION",
        message: `You arrive at ${Faker.address.city()}`,
      },
      { type: "EVENT_HAPPENS", message: Faker.lorem.sentence() },
    ],
  },
};
