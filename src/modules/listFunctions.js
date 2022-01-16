import { checkRequirements } from "./requirements";

// EXPORTS

// Location
export const getLocation = (book, gameState) => {
  console.log('book', book, 'gameState', gameState)
  let locationId = checkOverride(book, gameState, gameState.action.path.toLocationId);
  return {
    name: book.locations[locationId].name,
    description: book.locations[locationId].description,
    events: makeLocationEventList(book, gameState, locationId),
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
      events: getEventList(
        book,
        gameState,
        book.items[itemId].events
      ),
    }))
  );
};

// Helpers
const getEvent = (book, gameState, eventId) => {
  return {
    id: eventId,
    // didHappen: gameState.happenedEvents.includes(eventId),
    reqMet: checkRequirements(gameState, book.events[eventId].requirements),
    ...book.events[eventId],
  };
};

const getEventList = (book, gameState, eventIds) =>
  eventIds &&
  eventIds.map((eventId) => getEvent(book, gameState, eventId));

// Location

const checkOverride = (book, gameState, locationId) => {
  console.log(locationId)
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
        events: path.events,
      };
    })
  );
};

const makeLocationEventList = (book, gameState, locationId) => {
  return getEventList(
    book,
    gameState,
    book.locations[locationId].events
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
      events: getEventList(book, gameState, item.events),
    }))
  );
};

const makeLocationNpcList = (book, gameState, locationId) => {
  console.log('makeNPC', book, gameState, locationId)

  const npcs = book.locations[locationId].npcs &&
    book.locations[locationId].npcs.map((npcId) => ({
      ...book.npcs[npcId],
      reqMet: checkRequirements(gameState, book.npcs[npcId].requirements),
    }))
  console.log(npcs)
  return (
    book.locations[locationId].npcs &&
    book.locations[locationId].npcs.map((npcId) => ({
      ...book.npcs[npcId],
      reqMet: checkRequirements(gameState, book.npcs[npcId].requirements),
    }))
  );
};
