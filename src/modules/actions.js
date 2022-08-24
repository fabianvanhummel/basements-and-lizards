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

      // Add a bit more here later
      if(eventId === book.finalEvent) {
        gameState.gameFinished = true
        reactions.push({ type: "GAME_FINISHED", message: 'You finished the game!' });
      }

      event.message &&
        reactions.push({ type: "EVENT_HAPPENS", message: event.message });
    });

  // Return reactions array
  return { reactions, newEventIds, revertEventIds, gameState };
};

export const handleTakeItem = (item, book, gameState) => {
  const reactions = [];
  let pastEvents = [...gameState.pastEvents];
  let eventResponse;

  reactions.push({
    type: "PICK_UP_ITEM",
    message: `You pick up ${item.name}`,
  });

  eventResponse = doEvents(item.events, book, gameState);
  gameState = eventResponse.gameState
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Check for a teleport
  let locationId = gameState.location;
  if (item.toLocationId) {
    locationId = item.toLocationId;
    const location = book.locations[locationId];

    reactions.push({
      type: "TELEPORTED",
      message: `You are teleported to ${location.name}`,
    });

    // The party arrives at the location.
    reactions.push({
      type: "ARRIVE_AT_LOCATION",
      message: `You arrive at ${location.name}`,
    });

    // Handle the events that happen at the new location.
    eventResponse = doEvents(location.events, book, gameState);
    gameState = eventResponse.gameState
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
          return true;
        }
        return false;
      });
    }
  }

  const newGameState = {
    ...gameState,
    location: locationId,
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
  gameState = eventResponse.gameState
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
  gameState = eventResponse.gameState
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
    message: `You approach ${npc.name}`,
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
  gameState = eventResponse.gameState
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Handle potential items.
  option.items &&
    option.items.forEach((itemId) => {
      const item = book.items[itemId];
      reactions.push({
        type: "GET_ITEM_NPC",
        message: `You receive ${item.name}`,
      });
      inventoryItems.push(itemId);
    });

  // Check for a teleport
  const teleported = !!option.toLocationId;
  if (teleported) {
    const location = book.locations[option.toLocationId];

    reactions.push({
      type: "TELEPORTED",
      message: `You are teleported to ${location.name}`,
    });

    // The party arrives at the location.
    reactions.push({
      type: "ARRIVE_AT_LOCATION",
      message: `You arrive at ${location.name}`,
    });

    // Handle the events that happen at the new location.
    eventResponse = doEvents(location.events, book, gameState);  
    gameState = eventResponse.gameState
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
          return true;
        }
        return false;
      });
    }
  }

  const newGameState = {
    ...gameState,
    location: teleported ? option.toLocationId : gameState.location,
    npc: teleported ? null : gameState.npc,
    inventoryItems,
    pastEvents,
  };

  return { reactions, newGameState };
};

export const handleEndNpc = (npc, gameState) => {
  const reactions = [];

  reactions.push({
    type: "NPC_INTERACTION",
    message: `You stop talking with ${npc.name}`,
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
  gameState = eventResponse.gameState
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Handle potential items.
  option.items &&
    option.items.forEach((itemId) => {
      const item = book.items[itemId];
      reactions.push({
        type: "GET_ITEM_COMBAT",
        message: `You receive ${item.name}`,
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
    message: `You leave combat named: ${combatTitle}`,
  });

  const newGameState = {
    ...gameState,
    combat: null,
  };

  return { reactions, newGameState };
};

export const handleStartThing = (thingId, book, gameState) => {
  const reactions = [];

  const thing = book.things[thingId];

  reactions.push({
    type: "THING_INTERACTION",
    message: `You start interacting with ${thing.name}`,
  });

  const newGameState = {
    ...gameState,
    thing: thingId,
  };

  return { reactions, newGameState };
};

export const handleInteractThing = (option, book, gameState) => {
  const reactions = [];
  let pastEvents = [...gameState.pastEvents];
  const inventoryItems = [...gameState.inventoryItems];
  let eventResponse;

  reactions.push({
    type: "THING_INTERACTION",
    message: `${option.response}`,
  });

  // Handle the events.
  eventResponse = doEvents(option.events, book, gameState);
  gameState = eventResponse.gameState
  reactions.push(...eventResponse.reactions);
  pastEvents.push(...eventResponse.newEventIds);
  // https://stackoverflow.com/questions/1187518
  pastEvents = pastEvents.filter(
    (x) => !eventResponse.revertEventIds.includes(x),
  );

  // Handle potential items.
  option.items &&
    option.items.forEach((itemId) => {
      const item = book.items[itemId];
      reactions.push({
        type: "GET_ITEM_THING",
        message: `You receive ${item.name}`,
      });
      inventoryItems.push(itemId);
    });

  // Check for a teleport
  const teleported = !!option.toLocationId;
  let combat = null; // Potential combat on new location lands here
  if (teleported) {
    const location = book.locations[option.toLocationId];

    reactions.push({
      type: "TELEPORTED",
      message: `You were teleported to ${location.name}`,
    });

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
    const newGameState = {
      ...gameState,
      location: teleported ? option.toLocationId : gameState.location,
      thing: teleported ? null : gameState.thing,
      inventoryItems,
      pastEvents,
    };

    location.combat &&
      location.combat.find((locationCombat) => {
        if (
          !locationCombat.requirements ||
          (locationCombat.requirements &&
            checkRequirements(newGameState, locationCombat.requirements))
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
  }

  const newGameState = {
    ...gameState,
    location: teleported ? option.toLocationId : gameState.location,
    thing: teleported ? null : gameState.thing,
    inventoryItems,
    pastEvents,
    combat: teleported ? combat : gameState.combat,
  };

  return { reactions, newGameState };
};

export const handleEndThing = (thing, gameState) => {
  const reactions = [];

  reactions.push({
    type: "THING_INTERACTION",
    message: `You stop interacting with ${thing.name}`,
  });

  const newGameState = {
    ...gameState,
    thing: null,
  };

  return { reactions, newGameState };
};
