import React, { useEffect, useState } from "react";
import { Reaction } from "./Reaction";
import { getLocation } from "../modules/listFunctions";
import Location from "../components/Location";
import { Toggle } from "../components/Toggle";

export const GameTab = ({ book, gameState, changeLog, handleAction }) => {
  // Stores latest reaction in state, so they can be dismissed
  const [reactions, setReactions] = useState(changeLog.reactions);
  // When a new action is done, reset the reactions
  useEffect(() => setReactions(changeLog.reactions), [changeLog]);
  const [toggled, toggle] = useState(true);

  return (
    <div>
      {reactions && (
        <ul className="mb-5">
          {reactions.map((reaction, i) => (
            <li key={i} className="mt-3">
              <Reaction
                {...reaction}
                dismiss={() => {
                  const newReactions = reactions.filter((_, j) => i !== j);
                  setReactions(newReactions);
                }}
              />
            </li>
          ))}
        </ul>
      )}

      <Location {...getLocation(book, gameState)} handleAction={handleAction} />
      <Toggle toggled={toggled} toggle={toggle} />
    </div>
  );
};
