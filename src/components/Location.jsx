import { Event } from "./Event";
import { Path } from "./Path";

export const Location = ({ name, description, events, paths, setLocation, addEvent }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">{name}</h1>
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
  )
};

export default Location;
