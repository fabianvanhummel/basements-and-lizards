import { Event } from "./Event";
import { Item } from "./Item";
import { Path } from "./Path";
import { useState } from "react";

export const Location = ({
  name,
  description,
  events,
  items,
  paths,
  setLocation,
  addEvent,
  addItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const availablePaths =
    paths &&
    paths.filter((path) => {
      return path.reqMet;
    });

  const blockedPaths =
    paths &&
    paths.filter((path) => {
      return !path.reqMet;
    });

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
            {events.map((event, index) => (
              <li key={index} className="mt-2">
                <Event {...event} addEvent={addEvent} />
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
                <Item {...item} addItem={addItem} addEvent={addEvent} />
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
          {availablePaths.length > 0 && (
            <ul>
              {availablePaths.map((path, index) => (
                <li key={index} className="mt-2">
                  <Path {...path} setLocation={setLocation} />
                </li>
              ))}
            </ul>
          )}
          {blockedPaths.length > 0 && (
            <div className="border rounded shadow-sm">
              <button
                type="button"
                aria-label="Open item"
                title="Open item"
                className="flex items-center justify-between w-full p-4 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <p className="text-lg font-medium">Blocked Paths</p>
                <div className="flex items-center justify-center w-8 h-8 border rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-3 text-gray-600 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                  >
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      points="2,7 12,17 22,7"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              {isOpen && (
                <div className="p-4 pt-0">
                  {
                    <ul>
                      {blockedPaths.map((path, index) => (
                        <li key={index} className="mt-2">
                          <Path {...path} setLocation={setLocation} />
                        </li>
                      ))}
                    </ul>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Location;
