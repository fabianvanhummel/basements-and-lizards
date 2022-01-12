import { actionAddEvent, actionSetLocation, actionAddItem } from "./actions";
import { checkRequirements } from "./requirements";

// EXPORTS

// Location
export const getLocation = (book, gameState, setGameState) => {
  let locationId = checkOverride(book, gameState, gameState.locationIdState);
  return {
    name: book.locations[locationId].name,
    description: book.locations[locationId].description,
    events: makeLocationEventList(book, gameState, setGameState, locationId),
    items: makeLocationItemList(book, gameState, setGameState, locationId),
    npcs: makeLocationNpcList(book, gameState, setGameState, locationId),
    paths: makeLocationPathList(book, gameState, setGameState, locationId),
  };
};

// Inventory
export const makeInventoryItemList = (book, gameState, setGameState) => {
  return (
    gameState.inventoryItems &&
    gameState.inventoryItems.map((itemId) => ({
      ...book.items[itemId],
      events: getEventList(
        book,
        gameState,
        setGameState,
        book.items[itemId].events
      ),
    }))
  );
};

// Helpers
const getEvent = (book, gameState, setGameState, eventId) => {
  const addEvent = (id) => {
    actionAddEvent(gameState, setGameState, id);
  };
  return {
    id: eventId,
    didHappen: gameState.happenedEvents.includes(eventId),
    reqMet: checkRequirements(gameState, book.events[eventId].requirements),
    addEvent,
    ...book.events[eventId],
  };
};

const getEventList = (book, gameState, setGameState, eventIds) =>
  eventIds &&
  eventIds.map((eventId) => getEvent(book, gameState, setGameState, eventId));

// Location

const checkOverride = (book, gameState, locationId) => {
  if (!book.locations[locationId].override) return locationId;
  const override = book.locations[locationId].override.find((override) =>
    checkRequirements(gameState, override.requirements)
  );
  if (override) return checkOverride(book, gameState, override.byLocationId);
  return locationId;
};

const makeLocationPathList = (book, gameState, setGameState, locationId) => {
  const setLocation = (id) => {
    actionSetLocation(gameState, setGameState, id);
  };
  return (
    book.locations[locationId].paths &&
    book.locations[locationId].paths.map((path) => {
      return {
        reqMet: checkRequirements(gameState, path.requirements),
        toLocationId: path.toLocationId,
        name: path.name,
        description: path.description,
        events: getEventList(book, gameState, setGameState, path.events),
        setLocation,
      };
    })
  );
};

const makeLocationEventList = (book, gameState, setGameState, locationId) => {
  return getEventList(
    book,
    gameState,
    setGameState,
    book.locations[locationId].events
  );
};

const makeLocationItemList = (book, gameState, setGameState, locationId) => {
  const addItem = (id) => {
    actionAddItem(gameState, setGameState, id);
  };
  return (
    book.locations[locationId].items &&
    book.locations[locationId].items.map((item) => ({
      ...book.items[item.id],
      id: item.id,
      isPresent: !gameState.inventoryItems.includes(item.id),
      reqMet: checkRequirements(gameState, item.requirements),
      events: getEventList(book, gameState, setGameState, item.events),
      addItem,
    }))
  );
};

const makeLocationNpcList = (book, gameState, setGameState, locationId) => {
  const addEvent = (id) => {
    actionAddEvent(gameState, setGameState, id);
  };
  const addItem = (id) => {
    actionAddItem(gameState, setGameState, id);
  };
  return (
    book.locations[locationId].npcs &&
    book.locations[locationId].npcs.map((npcId) => ({
      ...book.npcs[npcId],
      reqMet: checkRequirements(gameState, book.npcs[npcId].requirements),
      addEvent,
      addItem,
    }))
  );
};
