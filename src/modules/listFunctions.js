import { checkRequirements } from "./requirements";

// EXPORTS

// Location
export const getLocation = (book, gameState) => {
  let locationId = checkOverride(book, gameState, gameState.location);
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
    gameState.inventoryItems.map((itemId) => ({
      ...book.items[itemId],
    }))
  );
};

// Location
const checkOverride = (book, gameState, locationId) => {
  if (!book.locations[locationId].override) return locationId;
  const override = book.locations[locationId].override.find((override) =>
    checkRequirements(gameState, override.requirements)
  );
  if (override) return checkOverride(book, gameState, override.byLocationId);
  return locationId;
};

const makeLocationPathList = (book, gameState, locationId) => {
  return (
    book.locations[locationId].paths &&
    book.locations[locationId].paths.map((path) => {
      return {
        reqMet: checkRequirements(gameState, path.requirements),
        toLocationId: path.toLocationId,
        name: path.name,
        description: path.description,
      };
    })
  );
};

const makeLocationItemList = (book, gameState, locationId) => {
  return (
    book.locations[locationId].items &&
    book.locations[locationId].items.map((item) => ({
      ...book.items[item.id],
      id: item.id,
      isPresent: !gameState.inventoryItems.includes(item.id),
      reqMet: checkRequirements(gameState, item.requirements),
    }))
  );
};

const makeLocationNpcList = (book, gameState, locationId) => {
  return (
    book.locations[locationId].npcs &&
    book.locations[locationId].npcs.map((npcId) => ({
      ...book.npcs[npcId],
      reqMet: checkRequirements(gameState, book.npcs[npcId].requirements),
    }))
  );
};
