import React, { useState, createContext } from "react";

// Create Context Object
export const Context = createContext();

// Create a provider for components to consume and subscribe to changes
export const ContextProvider = ({ children, book }) => {
  const [locationIdState, setLocation] = useState(book["start-location"]);
  const [eventIdsState, setEvents] = useState([]);
  const [itemIdsState, setItems] = useState([]);

  const addEvent = (eventId) => {
    setEvents([...eventIdsState, eventId]);
  };

  const addItem = (itemId) => {
    setItems([...itemIdsState, itemId]);
  };

  const activeLocation = book.locations[locationIdState];

  const getEvent = (id) => ({
    ...book.events[id],
    didHappen: eventIdsState.includes(id),
  });

  const getItem = (id) => ({
    ...book.items[id],
    isPresent: !itemIdsState.includes(id),
  });

  const checkRequirements = (requirements) => {
    if (!requirements) return true;

    let reqMet = true;
    requirements.forEach((eventId) => {
      if (!eventIdsState.includes(eventId)) {
        reqMet = false;
      }
    });
    return reqMet;
  };

  const items =
    itemIdsState &&
    itemIdsState.map((itemId) => ({
      ...book.items[itemId],
      id: itemId,
      events:
        book.items[itemId].events &&
        book.items[itemId].events.map((eventId) => ({
          ...book.events[eventId],
          id: eventId,
          didHappen: eventIdsState.includes(eventId),
        })),
    }));

  return (
    <Context.Provider
      value={{
        activeLocation,
        items,
        getEvent,
        getItem,
        checkRequirements,
        setLocation,
        addEvent,
        addItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};
