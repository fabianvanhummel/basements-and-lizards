import { checkRequirements } from "./requirements";

// EXPORTS

// NPC
export const getNpc = (book, gameState) => {
  let npcId = gameState.npc;
  return {
    name: book.npcs[npcId].name,
    description: book.npcs[npcId].description,
    options: makeNpcTalkOptionsList(book, gameState, npcId),
  };
};

// Thing
export const getThing = (book, gameState) => {
  let thingId = gameState.thing;
  return {
    name: book.things[thingId].name,
    description: book.things[thingId].description,
    options: makeThingInteractOptionsList(book, gameState, thingId),
  };
};

// Location
export const getLocation = (book, gameState) => {
  let locationId = checkOverride(book, gameState, gameState.location);
  return {
    name: book.locations[locationId].name,
    description: book.locations[locationId].description,
    items: makeLocationItemList(book, gameState, locationId),
    npcs: makeLocationNpcList(book, gameState, locationId),
    things: makeLocationThingList(book, gameState, locationId),
    paths: makeLocationPathList(book, gameState, locationId),
  };
};

export const checkOverride = (book, gameState, locationId) => {
  if (!book.locations[locationId].override) return locationId;
  const override = book.locations[locationId].override.find((override) =>
    checkRequirements(gameState, override.requirements),
  );
  if (override) return checkOverride(book, gameState, override.byLocationId);
  return locationId;
};

// Combat
export const getCombat = (book, gameState) => {
  let combatId = gameState.combat;
  return {
    ...book.combats[gameState.combat],
    options: makeCombatOptionsList(book, gameState, combatId),
  };
};

// Inventory
export const makeInventoryItemList = (book, gameState) => {
  return (
    gameState.inventoryItems &&
    gameState.inventoryItems.map((itemId) => ({
      ...book.items[itemId],
    }))
  );
};

// HELPER FUNCTIONS

// NPC
const makeNpcTalkOptionsList = (book, gameState, npcId) => {
  return (
    book.npcs[npcId].options &&
    book.npcs[npcId].options.map((option) => {
      return {
        reqMet: checkRequirements(gameState, option.requirements),
        text: option.text,
        response: option.response,
        events: option.events,
        items: option.items,
        toLocationId: option.toLocationId,
      };
    })
  );
};

// Things
const makeThingInteractOptionsList = (book, gameState, thingId) => {
  return (
    book.things[thingId].options &&
    book.things[thingId].options.map((option) => {
      return {
        reqMet: checkRequirements(gameState, option.requirements),
        text: option.text,
        response: option.response,
        events: option.events,
        items: option.items,
        toLocationId: option.toLocationId,
      };
    })
  );
};

// Combat
const makeCombatOptionsList = (book, gameState, combatId) => {
  return (
    book.combats[combatId].options &&
    book.combats[combatId].options.map((option) => {
      return {
        reqMet: checkRequirements(gameState, option.requirements),
        text: option.text,
        response: option.response,
        events: option.events,
        items: option.items,
      };
    })
  );
};

// Location
const makeLocationPathList = (book, gameState, locationId) => {
  return (
    book.locations[locationId].paths &&
    book.locations[locationId].paths.map((path) => {
      return {
        reqMet: checkRequirements(gameState, path.requirements),
        toLocationId: path.toLocationId,
        name: path.name,
        description: path.description,
        events: path.events,
      };
    })
  );
};

const makeLocationItemList = (book, gameState, locationId) => {
  return (
    book.locations[locationId].items &&
    book.locations[locationId].items
      .map((item) => ({
        ...book.items[item.id],
        id: item.id,
        toLocationId: item.toLocationId,
        isPresent: !gameState.inventoryItems.includes(item.id),
        reqMet: checkRequirements(gameState, item.requirements),
        events: item.events,
      }))
      .filter((item) => item.isPresent)
  );
};

const makeLocationNpcList = (book, gameState, locationId) => {
  return (
    book.locations[locationId].npcs &&
    book.locations[locationId].npcs.map((npc) => ({
      ...book.npcs[npc.id],
      id: npc.id,
      reqMet: checkRequirements(gameState, npc.requirements),
    }))
  );
};

const makeLocationThingList = (book, gameState, locationId) => {
  return (
    book.locations[locationId].things &&
    book.locations[locationId].things.map((thing) => ({
      ...book.things[thing.id],
      id: thing.id,
      reqMet: checkRequirements(gameState, thing.requirements),
    }))
  );
};
