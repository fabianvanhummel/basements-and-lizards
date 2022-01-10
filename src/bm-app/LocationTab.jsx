import React from "react";
import { Location } from "../components/Location";

import {
  makeLocationPathList,
  makeLocationEventList,
  makeLocationItemList,
  makeLocationNpcList,
  checkOverride,
} from "../modules/listFunctions";

export const LocationTab = ({ book, stateObject }) => {
  let locationId = checkOverride(
    book,
    stateObject.gameState,
    stateObject.gameState.locationIdState
  );
  return (
    <div className="p-4">
      <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400 text-center text-3xl font-sans">
        You are at
      </p>
      <Location
        name={book.locations[locationId].name}
        description={book.locations[locationId].description}
        events={makeLocationEventList(book, stateObject, locationId)}
        items={makeLocationItemList(book, stateObject, locationId)}
        npcs={makeLocationNpcList(book, stateObject, locationId)}
        paths={makeLocationPathList(book, stateObject, locationId)}
      />
    </div>
  );
};
