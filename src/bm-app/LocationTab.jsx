import React from "react";
import { Location } from "../components/Location";

import {
  makeLocationPathList,
  makeLocationEventList,
  makeLocationItemList,
  makeLocationNpcList,
  checkOverride,
} from "../modules/listFunctions";

export const LocationTab = ({ book, gameState, setGameState }) => {
  let locationId = checkOverride(
    book,
    gameState,
    gameState.locationIdState
  );
  return (
    <div className="p-4">
      <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400 text-center text-3xl font-sans">
        You are at
      </p>
      <Location
        name={book.locations[locationId].name}
        description={book.locations[locationId].description}
        events={makeLocationEventList(
          book,
          gameState,
          setGameState,
          locationId
        )}
        items={makeLocationItemList(book, gameState, setGameState, locationId)}
        npcs={makeLocationNpcList(book, gameState, setGameState, locationId)}
        paths={makeLocationPathList(book, gameState, setGameState, locationId)}
      />
    </div>
  );
};
