import { checkRequirements } from "./requirements";
import { checkLocationOverride, checkItemOverride } from "./overrides";

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

// Location
export const getLocation = (book, gameState) => {
  let locationId = checkLocationOverride(book, gameState, gameState.location);
  return {
    name: book.locations[locationId].name,
    description: book.locations[locationId].description,
    items: makeLocationItemList(book, gameState, locationId),
    npcs: makeLocationNpcList(book, gameState, locationId),
    paths: makeLocationPathList(book, gameState, locationId),
  };
};

// Inventory
export const makeInventoryItemList = (book, gameState) => {
  return (
    gameState.inventoryItems &&
    gameState.inventoryItems.map((inventoryItemId) => {
      let itemId = checkItemOverride(book, gameState, inventoryItemId);
      return {
        ...book.items[itemId],
      };
    })
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
      .map((item) => {
        let itemId = checkItemOverride(book, gameState, item.id);
        return {
          ...book.items[itemId],
          id: item.id,
          isPresent: !gameState.inventoryItems.includes(item.id),
          reqMet: checkRequirements(gameState, item.requirements),
          events: item.events,
        };
      })
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
