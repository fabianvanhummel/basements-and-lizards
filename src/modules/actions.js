// Actions
export const actionAddEvent = (gameState, setGameState, eventId) => {
  setGameState({
    ...gameState,
    happenedEvents: [...gameState.happenedEvents, eventId],
    changeLog: "event-happened",
  });
};

export const actionSetLocation = (gameState, setGameState, locationId) => {
  setGameState({
    ...gameState,
    locationIdState: locationId,
    changeLog: "location-swap",
  });
};

export const actionAddItem = (gameState, setGameState, itemId) => {
  setGameState({
    ...gameState,
    inventoryItems: [...gameState.inventoryItems, itemId],
    changeLog: "item-added",
  });
};
