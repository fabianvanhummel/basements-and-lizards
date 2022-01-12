import React from "react";
import { InventoryItem } from "../components/Item";
import { makeInventoryItemList } from "../modules/listFunctions";

export const InventoryTab = ({ book, gameState, setGameState }) => {
  const inventoryItems = makeInventoryItemList(book, gameState, setGameState);
  return (
    <div className="p-4">
      <div className="max-w-2xl px-8 py-4 mx-auto bg-red-50 rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
            Inventory
          </h1>
          <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-red-600 rounded">
            Inventory
          </div>
        </div>

        {inventoryItems && (
          <div className="mt-4">
            <ul>
              {inventoryItems.map((inventoryItem, index) => (
                <li key={index} className="mt-2">
                  <InventoryItem {...inventoryItem} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
