import { Event } from "./Event";
import { Item } from "./Item";
import { Path } from "./Path";

export const Location = ({
  name,
  description,
  events,
  items,
  paths,
  setLocation,
  addEvent,
  addItem,
  toggleShowBlockedState,
}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
          {name}
        </h1>

        <button
          className="flex items-center justify-center sm:w-auto sm:mx-1 w-full px-2 py-1 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500"
          onClick={() => toggleShowBlockedState()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mx-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span className="mx-1">Toggle blocked elements</span>
        </button>

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
          <ul>
            {paths.map((path, index) => (
              <li key={index} className="mt-2">
                <Path {...path} setLocation={setLocation} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Location;
