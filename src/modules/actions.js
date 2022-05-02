import { checkRequirements } from "./requirements";

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
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Check if combat arises at new location.
  let combat = null;

  location.combat &&
    location.combat.find((locationCombat) => {
      if (
        !locationCombat.requirements ||
        (locationCombat.requirements &&
          checkRequirements(gameState, locationCombat.requirements))
      ) {
        reactions.push({
          type: "COMBAT_START",
          message: `You enter combat named: ${
            book.combats[locationCombat.id].title
          }`,
        });
        combat = locationCombat.id;
        return true;
      }
      return false;
    });

  const newGameState = {
    ...gameState,
    location: path.toLocationId,
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

export const handleMoveCombat = (option, book, gameState) => {
  const reactions = [];
  let pastEvents = [...gameState.pastEvents];
  const inventoryItems = [...gameState.inventoryItems];
  let eventResponse;

  reactions.push({
    type: "COMBAT_MOVE",
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
        type: "GET_ITEM_COMBAT",
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

export const handleEndCombat = (combatTitle, gameState) => {
  const reactions = [];

  reactions.push({
    type: "COMBAT_END",
    message: `You left combat named: ${combatTitle}`,
  });

  const newGameState = {
    ...gameState,
    combat: null,
  };

  return { reactions, newGameState };
};
