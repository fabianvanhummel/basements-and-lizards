import React from "react";

export const FinishTab = ({ gameState }) => {
  if (gameState && gameState.gameFinished) {
    return (
      <div className="p-4">
        <div className="max-w-2xl px-8 py-4 mx-auto bg-fuchsia-50 rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
              Game ending
            </h1>
          </div>
          <h2 className="py-8">Items gathered:</h2>
          <div className="font-bold">
            {gameState.inventoryItems.map((item) => item + ", ")}
          </div>
          <h2 className="py-8">Events triggered:</h2>
          <div className="font-bold">
            {gameState.pastEvents.map((event) => event + ", ")}
          </div>
          <div className="py-8">More stats to come...</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <div className="max-w-2xl px-8 py-4 mx-auto bg-fuchsia-50 rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
              You have not finished the game yet.
            </h1>
          </div>
        </div>
      </div>
    );
  }
};
