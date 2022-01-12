import { useState } from "react";
import { Event } from "./Event";
import { Path } from "./Path";
import { Item } from "./Item";
import { NPC } from "./NPC";
import { ButtonToggleBlocked } from "./Buttons";

export const ElementList = ({ type, elements }) => {
  const [showBlockedState, setShowBlockedState] = useState(false);
  let elementList = elements.filter(
    (element) => element.reqMet || showBlockedState
  );
  return (
    elements && (
      <div className="mt-4">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400 flex items-center justify-between">
          {type}
          <ButtonToggleBlocked
            showBlockedState={showBlockedState}
            setShowBlockedState={setShowBlockedState}
          />
        </span>
        <ul>
          {elementList.map((element, index) => (
            <li key={index} className="mt-2">
              {type === "Events" && <Event {...element} />}
              {type === "Paths" && <Path {...element} />}
              {type === "Items" && <Item {...element} />}
              {type === "Npcs" && <NPC {...element} />}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export const ElementHeader = ({ title, tag, color }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-700 dark:text-white">
        {title}
      </h1>
      <div
        className={
          "px-3 py-1 text-sm font-bold text-gray-100 bg-" +
          color +
          "-600 rounded"
        }
      >
        {tag}
      </div>
    </div>
  );
};
