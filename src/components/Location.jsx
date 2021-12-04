import { useContext } from "react";
import { Context } from "../bm-app/context";

import { Event } from "./Event";
import { Item } from "./Item";
import { Path } from "./Path";

export const Location = () => {
  const { activeLocation } = useContext(Context);
  const { name, description, events, paths, items } = activeLocation;

  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
          {name}
        </h1>
        <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-green-600 rounded">
          Location
        </div>
      </div>

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {events && (
        <div className="mt-4">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            Events
          </span>
          <ul>
            {events.map((id, index) => (
              <li key={index} className="mt-2">
                <Event id={id} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {items && (
        <div className="mt-4">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            Items
          </span>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="mt-2">
                <Item {...item} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {paths && (
        <div className="mt-4">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            Paths
          </span>
          <ul>
            {paths.map((path, index) => (
              <li key={index} className="mt-2">
                <Path {...path} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
