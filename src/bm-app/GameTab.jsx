import React, { useEffect, useState } from "react";
import { Reaction } from "./Reaction";
import { getLocation, getNpc } from "../modules/listFunctions";
import { Location } from "../components/Location";
import { NpcTalk } from "./NpcTalk";
import { checkForHints } from "../modules/hintFunctions";
import { HintButton } from "../components/HintButton";

export const GameTab = ({ book, gameState, changeLog, handleAction }) => {
  // Stores latest reaction in state, so they can be dismissed
  const [reactions, setReactions] = useState(changeLog.reactions);
  // When a new action is done, reset the reactions
  useEffect(() => setReactions(changeLog.reactions), [changeLog]);
  // Check for available hints
  const hint = checkForHints(book, gameState);

  return (
    <div>
      {hint && <HintButton hintText={hint} />}

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

      {gameState.npc ? (
        <NpcTalk {...getNpc(book, gameState)} handleAction={handleAction} />
      ) : (
        <Location
          {...getLocation(book, gameState)}
          handleAction={handleAction}
        />
      )}
    </div>
  );
};
