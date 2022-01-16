import React, { useState } from "react";
import Faker from "faker";
import { GameTab } from "./GameTab";
import { checkRequirements } from "../modules/requirements";

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
          events: ["event-1"],
        },
      ],
      npcs: ["npc-1"],
      events: ["event-2"],
    },
  },
  events: {
    "event-1": {
      name: Faker.lorem.words(),
      description: Faker.lorem.sentence(),
    },
    "event-2": {
      name: Faker.lorem.words(),
      description: Faker.lorem.sentence(),
    },
    "event-3": {
      name: Faker.lorem.words(),
      description: Faker.lorem.sentence(),
    },
  },
  npcs: {
    "npc-1": {
      name: Faker.name.findName(),
      description: Faker.lorem.sentence(),
      events: ["event-3"],
    },
  },
};

// export const GoToLocation = Template.bind({});
// GoToLocation.args = {
//   book,
//   gameState: {
//     action: {
//       type: "GO_TO_LOCATION",
//       reactions: [
//         { type: "ARRIVE_AT_LOCATION", locationId: "location-1" },
//         { type: "EVENT_HAPPENS", eventId: "event-1" },
//       ],
//     },
//   },
// };

export const TakePath = Template.bind({});
TakePath.args = {
  book,
  gameState: {
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

// export const InspectItem = Template.bind({});
// InspectItem.args = {
//   gameState: {
//     action: { type: "INSPECT_ITEM" },
//     reactions: [
//       { type: "FOLLOW_PATH", message: `You take ${Faker.address.direction()}` },
//       { type: "EVENT_HAPPENS", message: Faker.lorem.sentence() },
//       {
//         type: "ARRIVE_AT_LOCATION",
//         message: `You arrive at ${Faker.address.city()}`,
//       },
//       { type: "EVENT_HAPPENS", message: Faker.lorem.sentence() },
//     ],
//   },
// };

export const ApproachNPC = Template.bind({});
ApproachNPC.args = {
  book,
  gameState: {
    action: { type: "APPROACH_NPC", npcId: "npc-1" },
    reactions: [{ type: "EVENT_HAPPENS", message: "An event occurred." }],
  },
};

export const Experiment = () => {
  const [gameState, setGameState] = useState({
    // action is the active move, we can use this te determine where we are.
    action: { type: "TAKE_PATH", path: { toLocationId: book.initialLocation } },
    // reactions are a summary of what happened after a certain action was done.
    reactions: [],
    pastEvents: [], // pastEvent to store all events that have happened.
    inventoryItems: [], // inventoryItems to store all items that have been picked up.
  });

  const handleTakePath = (action) => {
    const reactions = [];
    const pastEvents = [...gameState.pastEvents];

    // The party follows the path that was chosen.
    reactions.push({
      type: "FOLLOW_PATH",
      message: `You take ${action.path.name}`,
    });

    // Handle the events that happen on the path.
    action.path.events &&
      action.path.events.forEach((eventId) => {
        if (gameState.pastEvents.includes(eventId)) return;

        const event = book.events[eventId];

        if (event.requirements && !checkRequirements(event.requirements))
          return;

        pastEvents.push(eventId);

        reactions.push({ type: "EVENT_HAPPENS", message: event.message });
      });

    const location = book.locations[action.path.toLocationId];

    // The party arrives at the location.
    reactions.push({
      type: "ARRIVE_AT_LOCATION",
      message: `You arrive at ${location.name}`,
    });

    // Handle the events that happen at the new location.
    location.events &&
      location.events.forEach((eventId) => {
        if (gameState.pastEvents.includes(eventId)) return;

        const event = book.events[eventId];

        if (event.requirements && !checkRequirements(event.requirements))
          return;

        pastEvents.push(eventId);

        reactions.push({ type: "EVENT_HAPPENS", message: event.message });
      });

    setGameState({
      ...gameState,
      action,
      reactions,
      pastEvents,
    });
  };

  const handleApproachNpc = (npcId) => {};

  const handleAction = (action) => {
    // Maps the action to the right function. This way, we only have to pass
    // one prop to handle all changes.
    switch (action.type) {
      case "TAKE_PATH":
        handleTakePath(action);
        break;
      case "APPROACH_NPC":
        handleApproachNpc(action);
        break;
      default:
        break;
    }
  };

  return <GameTab book={book} gameState={gameState} handleAction={handleAction} />;
};
