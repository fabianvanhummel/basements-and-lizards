import { useState, useEffect } from "react";
import "../styles/splashscreen.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { OverviewTab } from "./OverviewTab";
import { LocationTab } from "./LocationTab";
import { InventoryTab } from "./InventoryTab";
import { HistoryTab } from "./HistoryTab";
import { makeInventoryItemList } from "../modules/listFunctions";

export const BMApp = ({ book }) => {
  // Create base gamestate. This state is used to track the current location of the party, the obtained items and the happened events. For now the change that occurred to reach the current state is also saved, this might be refactored in the future.
  const [gameState, setGameState] = useState({
    locationIdState: book["initialLocation"],
    changeLog: "location-swap",
    happenedEvents: [],
    inventoryItems: [],
  });

  // Rework vars to states
  const [gameStateHistory, setGameStateHistory] = useState([]);

  // History: hierin slaan we states de states op
  useEffect(() => {
    setGameStateHistory([...gameStateHistory, [gameState]]);
  }, [gameState]);

  // Revert to an older gamestate that has been saved in the gameStateHistory array. Changes both the history (slices off the parts that are reverted) and the current gamestate.
  function travelBackInTime(index) {
    setGameStateHistory(gameStateHistory.slice(0, gameStateHistory.length - (index+1)))
    setGameState(gameStateHistory[gameStateHistory.length - (index + 1)][0])
  }

  // Change location and save it to the gameStateHistory
  const setLocation = (locationId) => {
    setGameState({
      ...gameState,
      locationIdState: locationId,
      changeLog: "location-swap",
    });
    saveState(gameState);
  };

  // Add a happened event to the gameState
  const addEvent = (eventId) => {
    setGameState({
      ...gameState,
      happenedEvents: [...gameState.happenedEvents, eventId],
      changeLog: "event-happened",
    });
    saveState(gameState);
  };

  // Add an obtained item to the gameState
  const addItem = (itemId) => {
    setGameState({
      ...gameState,
      inventoryItems: [...gameState.inventoryItems, itemId],
      changeLog: "item-added",
    });
    saveState(gameState);
  };

  const toggleShowBlockedState = () => {
    setShowBlockedState(!showBlockedState);
  };

  const checkRequirements = (requirements = []) => {
    let reqMet = true;
    let blocked = false;
    requirements.forEach((requirement) => {
      switch (requirement.type) {
        case "EVENT_DID_HAPPEN":
          if (!gameState.happenedEvents.includes(requirement.id)) {
            reqMet = false;
          }
          break;
        case "ITEM_IN_INVENTORY":
          if (!gameState.inventoryItems.includes(requirement.id)) {
            reqMet = false;
          }
          break;
        case "EVENT_NOT_HAPPENED":
          if (gameState.happenedEvents.includes(requirement.id)) {
            blocked = true;
          }
          break;
        default:
          // Do Nothing
          break;
      }
    });

    return reqMet && !blocked;
  };

  const getEvent = (id) => ({
    id,
    didHappen: gameState.happenedEvents.includes(id),
    reqMet: checkRequirements(book.events[id].requirements),
    addEvent,
    ...book.events[id],
  });

  // Check if the location has overrides and if so, checks if any requirements are met.
  // Recursively checks new location if so, or just returns the value if not.
  const checkOverride = (locationId) => {
    if (!book.locations[locationId].override) return locationId;
    const override = book.locations[locationId].override.find((override) =>
      checkRequirements(override.requirements)
    );
    setGameState(gameStateHistory[gameStateHistory.length - (index + 1)][0]);
  }

  return (
    <div className="fade-in-1s">
      <BrowserRouter>
        <nav className="bg-white shadow dark:bg-gray-800">
          <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl"
                  to="/"
                >
                  Basements & Lizards
                </h1>
              </div>

              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="items-center md:flex">
              <div className="flex flex-col md:flex-row md:mx-6">
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/location"
                >
                  Location
                </Link>
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/inventory"
                >
                  Inventory
                </Link>
                <Link
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                  to="/history"
                >
                  History
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<OverviewTab />} />

          <Route
            path="/location"
            element={
              <LocationTab
                book={book}
                gameState={gameState}
                setGameState={setGameState}
              />
            }
          />

          <Route
            path="/inventory"
            element={
              <InventoryTab
                inventoryItems={makeInventoryItemList(
                  book,
                  gameState,
                  setGameState
                )}
              />
            }
          />

          <Route
            path="/history"
            element={
              <HistoryTab
                gameStateHistory={gameStateHistory}
                travelBackInTime={travelBackInTime}
                book={book}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
