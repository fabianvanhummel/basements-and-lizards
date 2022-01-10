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
  switch (type) {
    case "Events":
      elementList = elementList.map((element, index) => (
        <li key={index} className="mt-2">
          <Event {...element} />
        </li>
      ));
      break;
    case "Paths":
      elementList = elementList.map((element, index) => (
        <li key={index} className="mt-2">
          <Path {...element} />
        </li>
      ));
      break;
    case "Items":
      elementList = elementList.map((element, index) => (
        <li key={index} className="mt-2">
          <Item {...element} />
        </li>
      ));
      break;
    case "Npcs":
      elementList = elementList.map((element, index) => (
        <li key={index} className="mt-2">
          <NPC {...element} />
        </li>
      ));
      break;
    default:
      // Do Nothing
      break;
  }
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
        <ul>{elementList}</ul>
      </div>
    )
  );
};
