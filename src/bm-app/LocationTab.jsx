import React from "react";
import { Location } from "../components/Location";

import { getLocation } from "../modules/listFunctions";

export const LocationTab = ({ book, gameState, setGameState }) => {
  return (
    <div className="p-4">
      <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400 text-center text-3xl font-sans">
        You are at
      </p>
      <Location {...getLocation(book, gameState, setGameState)} />
    </div>
  );
};
