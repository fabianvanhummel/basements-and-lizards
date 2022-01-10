import { Event } from "./Event";
import { DefaultButton } from "../components/Buttons";

export const Item = ({
  id,
  inventoryItem,
  isPresent,
  reqMet,
  name,
  description,
  events,
  addItem,
}) => (
  <div className="max-w-2xl px-8 py-4 mx-auto bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-700 dark:text-white">
        {name}
      </h1>
      <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-yellow-600 rounded">
        Item
      </div>
    </div>

    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

    {inventoryItem ? (
      <div>
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
      </div>
    ) : !isPresent ? (
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
                  <Event {...event} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ) : (
      <DefaultButton
        buttonText={"Pick up " + name}
        onClick={() => {
          addItem(id);
        }}
        isDisabled={!reqMet}
      />
    )}
  </div>
);

export default Item;
