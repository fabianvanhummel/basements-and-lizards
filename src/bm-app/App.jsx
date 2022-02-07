import { useState } from "react";
import { Router } from "./Router";
import {
  handleTakeItem,
  handleTakePath,
  handleStartNpc,
  handleEndNpc,
} from "../modules/actions";

export const App = ({ book }) => {
  // gameState holds all information as a result of all previous actions
  const [gameState, setGameState] = useState({
    location: book["initialLocation"],
    npc: undefined,
    pastEvents: [],
    inventoryItems: [],
  });

  // changeLog tracks the changes that are made as a result of the last action
  const [changeLog, setChangeLog] = useState({
    action: {},
    reactions: [],
  });

  // history stores the gameState and changeLog after each action
  // this can be used to go back in time or help with showing what happened
  const [history, setHistory] = useState([{ changeLog, gameState }]);

  const handleAction = (action) => {
    // Maps the action to the right function.
    // This way, we only have to pass one prop to handle all changes.

    let reactions;
    switch (action.type) {
      case "TAKE_ITEM":
        reactions = handleTakeItem(action.item, book, gameState, setGameState);
        setChangeLog({ action, reactions });
        setHistory([...history, { gameState, changeLog }]);
        break;
      case "TAKE_PATH":
        reactions = handleTakePath(action.path, book, gameState, setGameState);
        setChangeLog({ action, reactions });
        setHistory([...history, { gameState, changeLog }]);
        break;
      case "START_NPC":
        reactions = handleStartNpc(action.npcId, book, gameState, setGameState);
        setChangeLog({ action, reactions });
        setHistory([...history, { gameState, changeLog }]);
        break;
      case "END_NPC":
        reactions = handleEndNpc(action.npc, gameState, setGameState);
        setChangeLog({ action, reactions });
        setHistory([...history, { gameState, changeLog }]);
        break;
      case "BACK_IN_TIME":
        setHistory(history.slice(0, history.length - (action.steps + 1)));
        setGameState(history(history.length - 1).gameState);
        setChangeLog(history(history.length - 1).changeLog);
        break;
      default:
        break;
    }
  };

  return (
    <Router
      book={book}
      gameState={gameState}
      changeLog={changeLog}
      history={history}
      handleAction={handleAction}
    />
  );
};
