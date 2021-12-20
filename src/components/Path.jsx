import { Event } from "./Event";

export const Path = ({
  reqMet,
  toLocationId,
  name,
  description,
  events,
  setLocation,
  showBlocked,
}) => {
  if (!showBlocked && !reqMet) {
    return null;
  } else {
    return (
      <div className="max-w-2xl px-8 py-4 mx-auto bg-pink-50 rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-700 dark:text-white">
            {name}
          </h1>
          <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-pink-600 rounded">
            Path
          </div>
        </div>

        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

        <button
          disabled={!reqMet}
          onClick={() => {
            setLocation(toLocationId);
          }}
          className="disabled:opacity-50 disabled:pointer-events-none disabled:cursor-auto mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
        >
          {"Follow this path to " + toLocationId}
        </button>

        {events && (
          <ul className="mt-4">
            {events.map((event, index) => (
              <li key={index} className="mt-2">
                <Event {...event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
};

export default Path;
