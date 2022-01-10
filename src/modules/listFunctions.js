import { actionAddEvent, actionSetLocation, actionAddItem } from "./actions";
import { checkRequirements } from "./requirements";

// Helpers
const getEvent = (book, stateObject, eventId) => {
  const addEvent = (id) => {
    actionAddEvent(stateObject, id);
  };
  return {
    id: eventId,
    didHappen: stateObject.gameState.happenedEvents.includes(eventId),
    reqMet: checkRequirements(
      stateObject.gameState,
      book.events[eventId].requirements
    ),
    addEvent,
    ...book.events[eventId],
  };
};

const getEventList = (book, stateObject, eventIds) =>
  eventIds &&
  eventIds
    .map((eventId) => getEvent(book, stateObject, eventId))
    .filter((event) => event.reqMet || stateObject.showBlockedState);

// EXPORTED
// Location

export const checkOverride = (book, gameState, locationId) => {
  console.log("book: ", book);
  console.log("gameState: ", gameState);
  console.log("locationId: ", locationId);
  if (!book.locations[locationId].override) return locationId;
  const override = book.locations[locationId].override.find((override) =>
    checkRequirements(gameState, override.requirements)
  );
  if (override) return checkOverride(book, gameState, override.byLocationId);
  return locationId;
};

// List makers

export const makeLocationPathList = (book, stateObject, locationId) => {
  const setLocation = (id) => {
    actionSetLocation(stateObject, id);
  };
  return (
    book.locations[locationId].paths &&
    book.locations[locationId].paths
      .map((path) => {
        return {
          reqMet: checkRequirements(stateObject.gameState, path.requirements),
          toLocationId: path.toLocationId,
          name: path.name,
          description: path.description,
          events: getEventList(book, stateObject, path.events),
          setLocation,
        };
      })
      .filter((path) => path.reqMet || stateObject.showBlockedState)
  );
};

export const makeLocationEventList = (book, stateObject, locationId) => {
  return getEventList(book, stateObject, book.locations[locationId].events);
};

export const makeLocationItemList = (book, stateObject, locationId) => {
  const addItem = (id) => {
    actionAddItem(stateObject, id);
  };
  return (
    book.locations[locationId].items &&
    book.locations[locationId].items
      .map((item) => ({
        ...book.items[item.id],
        id: item.id,
        isPresent: !stateObject.gameState.inventoryItems.includes(item.id),
        reqMet: checkRequirements(stateObject.gameState, item.requirements),
        events: getEventList(book, stateObject, item.events),
        addItem,
      }))
      .filter((item) => item.reqMet || stateObject.showBlockedState)
  );
};

export const makeLocationNpcList = (book, stateObject, locationId) => {
  const addEvent = (id) => {
    actionAddEvent(stateObject, id);
  };
  const addItem = (id) => {
    actionAddItem(stateObject, id);
  };
  return (
    book.locations[locationId].npcs &&
    book.locations[locationId].npcs.map((npcId) => ({
      ...book.npcs[npcId],
      reqMet: checkRequirements(
        stateObject.gameState,
        book.npcs[npcId].requirements
      ),
      addEvent,
      addItem,
    }))
  );
};

export const makeInventoryItemList = (book, stateObject) => {
  return (
    stateObject.gameState.inventoryItems &&
    stateObject.gameState.inventoryItems.map((itemId) => ({
      ...book.items[itemId],
      id: itemId,
      events: getEventList(book, stateObject, book.items[itemId].events),
      inventoryItem: true,
      isPresent: !stateObject.gameState.inventoryItems.includes(itemId),
    }))
  );
};
