import React, { useEffect, useState } from "react";
import { Reaction } from "./Reaction";
import {
  getLocation,
  getNpc,
  getThing,
  getCombat,
} from "../modules/listFunctions";
import { Location } from "../components/Location";
import { NpcTalk } from "./NpcTalk";
import { ThingInteract } from "./ThingInteract";
import { checkForHints } from "../modules/hintFunctions";
import { HintButton } from "../components/HintButton";
import { Combat } from "./Combat";

export const GameTab = ({ book, gameState, changeLog, handleAction }) => {
  // Stores latest reaction in state, so they can be dismissed
  const [reactions, setReactions] = useState(changeLog.reactions);
  // When a new action is done, reset the reactions
  useEffect(() => setReactions(changeLog.reactions), [changeLog]);
  // Check for available hints
  const hint = checkForHints(book, gameState);

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

      {hint && <HintButton hintText={hint} />}

      {gameState.combat ? (
        <Combat {...getCombat(book, gameState)} handleAction={handleAction} />
      ) : gameState.npc ? (
        <NpcTalk {...getNpc(book, gameState)} handleAction={handleAction} />
      ) : gameState.thing ? (
        <ThingInteract
          {...getThing(book, gameState)}
          handleAction={handleAction}
        />
      ) : (
        <Location
          {...getLocation(book, gameState)}
          handleAction={handleAction}
        />
      )}
    </div>
  );
};
