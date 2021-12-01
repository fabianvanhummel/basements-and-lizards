import { Event } from "./Event";

export const Item = ({
  id,
  isPresent,
  name,
  description,
  events,
  addItem,
  addEvent,
}) => (
  <div className="max-w-2xl px-8 py-4 mx-auto bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-700 dark:text-white">{name}</h1>
      <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-yellow-600 rounded">
        Item
      </div>
    </div>

    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

    {!isPresent ? (
      <div>
        this item was looted
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
      </div>
    ) : (
      <button
        onClick={() => {
          addItem(id);
        }}
        className="mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
      >
        Pick up {name}
      </button>
    )}
  </div>
);

export default Item;
