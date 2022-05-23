export const checkForHints = (book, gameState) => {
  if (gameState.npc) {
    if (book.npcs[gameState.npc].hint) {
      return book.npcs[gameState.npc].hint;
    } else {
      return null;
    }
  } else if (gameState.combat) {
    if (book.combats[gameState.combat].hint) {
      return book.combats[gameState.combat].hint;
    } else {
      return null;
    }
  } else if (gameState.thing) {
    if (book.things[gameState.thing].hint) {
      return book.things[gameState.thing].hint;
    } else {
      return null;
    }
  } else if (gameState.location) {
    if (book.locations[gameState.location].hint) {
      return book.locations[gameState.location].hint;
    } else {
      return null;
    }
  }
};
