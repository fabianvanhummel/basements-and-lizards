import { Event } from "./Event";
import { DefaultButton } from "../components/Buttons";

export const Path = ({
  reqMet,
  toLocationId,
  name,
  description,
  events,
  setLocation,
}) => {
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

      <DefaultButton
        buttonText={"Follow this path to " + toLocationId}
        onClick={() => {
          setLocation(toLocationId);
        }}
        disabled={!reqMet}
      />

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
};

export default Path;
