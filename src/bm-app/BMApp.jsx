import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { OverviewTab } from "./OverviewTab";
import { LocationTab } from "./LocationTab";
import { InventoryTab } from "./InventoryTab";
import { HistoryTab } from "./HistoryTab";

export const BMApp = ({ book }) => {
  const [locationIdState, setLocation] = useState(book["start-location"]);
  const [eventIdsState, setEvents] = useState([]);
  const [itemIdsState, setItems] = useState([]);
  const [showBlockedState, setShowBlockedState] = useState(false);

  const addEvent = (eventId) => {
    const revertIds = book.events[eventId].revertEvents || [];
    setEvents(
      [...eventIdsState, eventId].filter((id) => !revertIds.includes(id))
    );
  };

  const addItem = (itemId) => {
    setItems([...itemIdsState, itemId]);
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
          if (!eventIdsState.includes(requirement.id)) {
            reqMet = false;
          }
          break;
        case "EVENT_NOT_HAPPENED":
          if (eventIdsState.includes(requirement.id)) {
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
    didHappen: eventIdsState.includes(id),
    reqMet: checkRequirements(book.events[id].requirements),
    showBlocked: showBlockedState,
    addEvent,
    ...book.events[id],
  });

  const makeEventList = (eventIds) =>
    eventIds &&
    eventIds
      .map((eventId) => getEvent(eventId))
      .filter((event) => event.reqMet || showBlockedState);

  const locationPaths = book.locations[locationIdState].paths
    .map((path) => {
      return {
        reqMet: checkRequirements(path.requirements),
        toLocationId: path.toLocationId,
        name: path.name,
        description: path.description,
        events: makeEventList(path.events),
      };
    })
    .filter((path) => path.reqMet || showBlockedState);

  const locationEvents = makeEventList(book.locations[locationIdState].events);

  const locationItems =
    book.locations[locationIdState].items &&
    book.locations[locationIdState].items.map((item) => ({
      ...book.items[item.id],
      id: item.id,
      isPresent: !itemIdsState.includes(item.id),
      events: makeEventList(item.events),
    }));

  const inventoryItems =
    itemIdsState &&
    itemIdsState.map((itemId) => ({
      ...book.items[itemId],
      id: itemId,
      events: makeEventList(book.items[itemId].events),
    }));

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
              name={book.locations[locationIdState].name}
              description={book.locations[locationIdState].description}
              events={locationEvents}
              items={locationItems}
              paths={locationPaths}
              setLocation={setLocation}
              addEvent={addEvent}
              addItem={addItem}
              toggleShowBlockedState={toggleShowBlockedState}
            />
          }
        />

        <Route
          path="/inventory"
          element={<InventoryTab items={inventoryItems} addEvent={addEvent} />}
        />

        <Route path="/history" element={<HistoryTab />} />
      </Routes>
    </BrowserRouter>
  );
};
