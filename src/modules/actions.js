import { checkRequirements } from "./requirements";
import { checkOverride } from "./listFunctions";

const doEvents = (eventIds, book, gameState) => {
  const reactions = [];
  const newEventIds = [];
  const revertEventIds = [];

  // Handle inputted events
  eventIds &&
    eventIds.forEach((eventId) => {
      if (gameState.pastEvents.includes(eventId)) return;

      const event = book.events[eventId];

      if (
        event.requirements &&
        !checkRequirements(gameState, event.requirements)
      )
        return;

      newEventIds.push(eventId);

      if (event.revertEvents) {
        revertEventIds.push(...event.revertEvents);
      }

      reactions.push({ type: "EVENT_HAPPENS", message: event.message });
    });

  // Return reactions array
  return { reactions, newEventIds, revertEventIds };
};

export const handleTakeItem = (item, book, gameState) => {
  const reactions = [];
  let pastEvents = [...gameState.pastEvents];
  let eventResponse;

  reactions.push({
    type: "PICK_UP_ITEM",
    message: `You picked up ${item.name}`,
  });

  eventResponse = doEvents(item.events, book, gameState);
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  const newGameState = {
    ...gameState,
    inventoryItems: [...gameState.inventoryItems, item.id],
    pastEvents,
  };

  return { reactions, newGameState };
};

export const handleTakePath = (path, book, gameState) => {
  const reactions = [];
  let pastEvents = [...gameState.pastEvents];
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
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Check for overrides on destination
  const locationId = checkOverride(book, gameState, path.toLocationId);
  const location = book.locations[locationId];

  // The party arrives at the location.
  reactions.push({
    type: "ARRIVE_AT_LOCATION",
    message: `You arrive at ${location.name}`,
  });

  // Handle the events that happen at the new location.
  eventResponse = doEvents(location.events, book, gameState);
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Check if combat arises at new location.
  let combat = null;
  if (location.combat && !gameState.pastCombats.includes(location.combat)) {
    reactions.push({
      type: "COMBAT",
      message: `You enter combat named: ${book.combats[location.combat].title}`,
    });
    combat = location.combat;
  }

  const newGameState = {
    ...gameState,
    location: locationId, // This is the overridden locationId
    pastEvents,
    combat,
  };

  return { reactions, newGameState };
};

export const handleStartNpc = (npcId, book, gameState) => {
  const reactions = [];

  const npc = book.npcs[npcId];

  reactions.push({
    type: "NPC_INTERACTION",
    message: `You approached ${npc.name}`,
  });

  const newGameState = {
    ...gameState,
    npc: npcId,
  };

  return { reactions, newGameState };
};

export const handleTalkNpc = (option, book, gameState) => {
  const reactions = [];
  let pastEvents = [...gameState.pastEvents];
  const inventoryItems = [...gameState.inventoryItems];
  let eventResponse;

  reactions.push({
    type: "NPC_RESPONSE",
    message: `${option.response}`,
  });

  // Handle the events.
  eventResponse = doEvents(option.events, book, gameState);
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Handle potential items.
  option.items &&
    option.items.map((itemId) => {
      const item = book.items[itemId];
      reactions.push({
        type: "GET_ITEM_NPC",
        message: `You received ${item.name}`,
      });
      inventoryItems.push(itemId);
    });

  const newGameState = {
    ...gameState,
    inventoryItems,
    pastEvents,
  };

  return { reactions, newGameState };
};

export const handleEndNpc = (npc, gameState) => {
  const reactions = [];

  reactions.push({
    type: "NPC_INTERACTION",
    message: `You stopped talking with ${npc.name}`,
  });

  const newGameState = {
    ...gameState,
    npc: null,
  };

  return { reactions, newGameState };
};

export const handleEndCombat = (combatId, combatTitle, gameState) => {
  const reactions = [];

  reactions.push({
    type: "COMBAT",
    message: `You resolved combat named: ${combatTitle}`,
  });

  const newGameState = {
    ...gameState,
    combat: null,
    pastCombats: [...gameState.pastCombats, combatId],
  };

  return { reactions, newGameState };
};
