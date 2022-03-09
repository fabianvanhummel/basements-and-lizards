import React, { useEffect, useState } from "react";
import { Reaction } from "./Reaction";
import { getLocation, getNpc, getCombat } from "../modules/listFunctions";
import { Location } from "../components/Location";
import { NpcTalk } from "./NpcTalk";
import { Combat } from "./Combat";

export const GameTab = ({ book, gameState, changeLog, handleAction }) => {
  // Stores latest reaction in state, so they can be dismissed
  const [reactions, setReactions] = useState(changeLog.reactions);
  // When a new action is done, reset the reactions
  useEffect(() => setReactions(changeLog.reactions), [changeLog]);

  const potentialCombat = getCombat(book, gameState);
  if (potentialCombat) {
    if (!gameState.combatId) {
      handleAction({
        type: "START_COMBAT",
        combatId: book.locations[gameState.location].combat.id,
      });
    }
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
        <Combat
          id={book.locations[gameState.location].combat.id}
          {...getCombat(book, gameState)}
          handleAction={handleAction}
        />
      </div>
    );
  } else {
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
  }
};
