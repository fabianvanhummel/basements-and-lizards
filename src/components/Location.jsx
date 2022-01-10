import { Event } from "./Event";
import { Item } from "./Item";
import { Path } from "./Path";
import { NPC } from "./NPC";
import { ButtonToggleBlocked } from "../components/Buttons";

export const Location = ({
  name,
  description,
  events,
  items,
  npcs,
  paths,
  toggleShowBlockedState,
}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
          {name}
        </h1>
        <ButtonToggleBlocked toggleShowBlockedState={toggleShowBlockedState} />

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
                <Event {...event} />
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

      {npcs && (
        <div className="mt-4">
          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
            NPCs
          </span>
          <ul>
            {npcs.map((npc, index) => (
              <li key={index} className="mt-2">
                <NPC {...npc} />
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

export default Location;
