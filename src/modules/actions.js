import { checkRequirements } from "./requirements";

export const handleTakeItem = (itemId, book, gameState, setGameState) => {
  const reactions = [];

  const item = book.items[itemId]

  reactions.push({
    type: "PICK_UP_ITEM",
    message: `You picked up ${item.name}`,
  });

  setGameState({
    ...gameState,
    inventoryItems: [...gameState.inventoryItems, itemId],
  });

  return reactions
};

export const handleTakePath = (path, book, gameState, setGameState) => {
  const reactions = [];
  const pastEvents = [...gameState.pastEvents];

  // The party follows the path that was chosen.
  reactions.push({
    type: "FOLLOW_PATH",
    message: `You take ${path.name}`,
  });

  // Handle the events that happen on the path.
  path.events &&
    path.events.forEach((eventId) => {
      if (gameState.pastEvents.includes(eventId)) return;

      const event = book.events[eventId];

      if (event.requirements && !checkRequirements(event.requirements))
        return;

      pastEvents.push(eventId);

      reactions.push({ type: "EVENT_HAPPENS", message: event.message });
    });

  const location = book.locations[path.toLocationId];

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
    location: path.toLocationId,
    pastEvents,
  });

  return reactions
};