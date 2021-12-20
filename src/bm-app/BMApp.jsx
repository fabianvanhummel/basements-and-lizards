import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { OverviewTab } from "./OverviewTab";
import { LocationTab } from "./LocationTab";
import { InventoryTab } from "./InventoryTab";
import { HistoryTab } from "./HistoryTab";

// History of gameStates
var gameStateHistory = [];
var inventoryItems = [];
var happenedEvents = [];

export const BMApp = ({ book }) => {

  const [gameState, setState] = useState(
    {
      locationIdState: book["start-location"],
      changeLog: ['location-swap'],
      eventHappenedTrigger: [],
      itemPickupTrigger: []
    }
  );

  function saveState(currentState) {
    gameStateHistory.push([currentState, inventoryItems, happenedEvents])
    console.log(gameStateHistory)
    // Check dit met Pim
  }

  function travelBackInTime(index) {
    setState(gameStateHistory[index][0])
    gameStateHistory = gameStateHistory.slice(-(index + 1))
    inventoryItems = gameStateHistory[index][1]
    happenedEvents = gameStateHistory[index][2]
  }

  const setLocation = (locationId) => {
    setState({
      ...gameState,
      locationIdState: locationId,
      changeLog: 'location-swap'
    })
    saveState(gameState)
  }

  // Adders
  const addEvent = (eventId) => {
    saveState(gameState)
    happenedEvents.push(eventId)
    setState({
      ...gameState,
      eventHappenedTrigger: eventId,
      changeLog: 'event-happened'
    })
  };

  const addItem = (itemId) => {
    saveState(gameState)
    inventoryItems.push(itemId)
    setState({
      ...gameState,
      itemPickupTrigger: itemId,
      changeLog: 'item-added'
    })
  };

  const locationPaths = book.locations[gameState.locationIdState].paths.map((path) => {
    let reqMet = true;
    path.requirements &&
      path.requirements.forEach((eventId) => {
        if (!happenedEvents.includes(eventId)) {
          reqMet = false;
        }
      }); // Checks paths for requirements
    return {
      reqMet: reqMet,
      toLocationId: path.toLocationId,
      name: path.name,
      description: path.description,
    };
  });

  const locationEvents =
    book.locations[gameState.locationIdState].events &&
    book.locations[gameState.locationIdState].events.map((eventId) => ({
      ...book.events[eventId],
      id: eventId,
      didHappen: happenedEvents.includes(eventId),
    }));

  const locationItems =
    book.locations[gameState.locationIdState].items &&
    book.locations[gameState.locationIdState].items.map((item) => ({
      ...book.items[item.id],
      id: item.id,
      isPresent: !inventoryItems.includes(item.id),
      events:
        item.events &&
        item.events.map((eventId) => ({
          ...book.events[eventId],
          id: eventId,
          didHappen: happenedEvents.includes(eventId),
        })),
    }));

  function deduceLocationHistory() {
    var historyNames = [];
    for (const key in gameStateHistory) {
      historyNames.push([book.locations[gameStateHistory[key][0].locationIdState].name, gameStateHistory[key][0].changeLog])
    }
    return (historyNames)
  }


  return (
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
              name={book.locations[gameState.locationIdState].name}
              description={book.locations[gameState.locationIdState].description}
              events={locationEvents}
              items={locationItems}
              paths={locationPaths}
              setLocation={setLocation}
              addEvent={addEvent}
              addItem={addItem}
            />
          }
        />

        <Route
          path="/inventory"
          element={<InventoryTab items={inventoryItems} addEvent={addEvent} />}
        />

        <Route path="/history" element={<HistoryTab gameStateHistory={gameStateHistory} travelBackInTime={travelBackInTime} deduceLocationHistory={deduceLocationHistory} />} />

      </Routes>
    </BrowserRouter>
  );
};
