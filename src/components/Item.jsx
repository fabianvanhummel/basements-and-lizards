import { useContext } from "react";
import { Context } from "../bm-app/context";

import { Event } from "./Event";

export const Item = ({ id, events }) => {
  const { getItem, addItem } = useContext(Context);
  const { name, description, isPresent } = getItem(id);

  return (
    <div class="max-w-2xl px-8 py-4 mx-auto bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-700 dark:text-white">{name}</h1>
        <div class="px-3 py-1 text-sm font-bold text-gray-100 bg-yellow-600 rounded">
          Item
        </div>
      </div>

      <p class="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {!isPresent ? (
        <p>
          this item was looted
          {events && (
            <div class="mt-4">
              <span class="text-sm font-light text-gray-600 dark:text-gray-400">
                Events
              </span>
              <ul>
                {events.map((id, index) => (
                  <li key={index} class="mt-2">
                    <Event id={id} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </p>
      ) : (
        <button
          onClick={() => {
            addItem(id);
          }}
          class="mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
        >
          Pick up {name}
        </button>
      )}
    </div>
  );
};
