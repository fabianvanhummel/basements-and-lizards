import { checkRequirements } from "./requirements";

const doEvents = (eventIds, book, gameState) => {
  const reactions = [];
  const newEventIds = [];

  // Handle inputted events
  eventIds &&
    eventIds.forEach((eventId) => {
      if (gameState.pastEvents.includes(eventId)) return;

      const event = book.events[eventId];

      if (event.requirements && !checkRequirements(event.requirements)) return;

      newEventIds.push(eventId);
      reactions.push({ type: "EVENT_HAPPENS", message: event.message });
    });

  // Return reactions array
  return { reactions, newEventIds };
};

export const handleTakeItem = (item, book, gameState, setGameState) => {
  const reactions = [];
  const pastEvents = [...gameState.pastEvents];
  let eventResponse;

  reactions.push({
    type: "PICK_UP_ITEM",
    message: `You picked up ${item.name}`,
  });

  eventResponse = doEvents(item.events, book, gameState);
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);

  setGameState({
    ...gameState,
    inventoryItems: [...gameState.inventoryItems, item.id],
    pastEvents,
  });

  return reactions;
};

export const handleTakePath = (path, book, gameState, setGameState) => {
  const reactions = [];
  const pastEvents = [...gameState.pastEvents];
  let eventResponse;

  // The party follows the path that was chosen.
  reactions.push({
    type: "FOLLOW_PATH",
    message: `You take ${path.name}`,
  });

  // Handle the events that happen on the path.
  eventResponse = doEvents(path.events, book, gameState);
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);

  const location = book.locations[path.toLocationId];

  // The party arrives at the location.
  reactions.push({
    type: "ARRIVE_AT_LOCATION",
    message: `You arrive at ${location.name}`,
  });

  // Handle the events that happen at the new location.
  eventResponse = doEvents(location.events, book, gameState);
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);

  setGameState({
    ...gameState,
    location: path.toLocationId,
    pastEvents,
  });

  return reactions;
};

export const handleTalkNpc = (npc, book, gameState, setGameState) => {
  const reactions = [];
  const pastEvents = [...gameState.pastEvents];
  //let eventResponse;

  reactions.push({
    type: "TALK_TO_NPC",
    message: `You talk with ${npc.name}`,
  });

  /*
  eventResponse = doEvents(item.events, book, gameState);
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  */

  /*
  setGameState({
    ...gameState,
    inventoryItems: [...gameState.inventoryItems, item.id],
    pastEvents,
  });
  */

  return reactions;
};
