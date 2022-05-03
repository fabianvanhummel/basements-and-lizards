import { useState } from "react";
import { Path } from "./Path";
import { Item } from "./Item";
import { Npc } from "./Npc";
import { DefaultButton, ButtonToggleBlocked } from "./Buttons";

export const ElementList = ({ type, elements, handleAction }) => {
  const [showBlockedState, setShowBlockedState] = useState(false);
  let elementList = elements.filter(
    (element) => element.reqMet || showBlockedState,
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
              {type === "Paths" && (
                <Path {...element} handleAction={handleAction} />
              )}
              {type === "Items" && (
                <Item {...element} handleAction={handleAction} />
              )}
              {type === "Npcs" && (
                <Npc {...element} handleAction={handleAction} />
              )}
              {type === "Options" && (
                <DefaultButton
                  onClick={() => {
                    handleAction({
                      type: "TALK_NPC",
                      option: element,
                    });
                  }}
                  disabled={!element.reqMet}
                >
                  {element.text}
                </DefaultButton>
              )}
              {type === "CombatOptions" && (
                <DefaultButton
                  onClick={() => {
                    handleAction({
                      type: "MOVE_COMBAT",
                      option: element,
                    });
                  }}
                  disabled={!element.reqMet}
                >
                  {element.text}
                </DefaultButton>
              )}
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
