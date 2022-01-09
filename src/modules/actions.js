// Actions
export const actionAddEvent = (stateObject, eventId) => {
  stateObject.setGameState({
    ...stateObject.gameState,
    happenedEvents: [...stateObject.gameState.happenedEvents, eventId],
    changeLog: "event-happened",
  });
};

export const actionSetLocation = (stateObject, locationId) => {
  stateObject.setGameState({
    ...stateObject.gameState,
    locationIdState: locationId,
    changeLog: "location-swap",
  });
};

export const actionAddItem = (stateObject, itemId) => {
  stateObject.setGameState({
    ...stateObject.gameState,
    inventoryItems: [...stateObject.gameState.inventoryItems, itemId],
    changeLog: "item-added",
  });
};
