import { useState } from "react";
import { Location } from "../components/Location";

export const Story = ({ book }) => {
  const [locationIdState, setLocation] = useState(book["start-location"]);
  const [eventIdsState, setEvents] = useState([]);
  const [itemIdsState, setItems] = useState([]);

  const addEvent = (eventId) => {
    setEvents([...eventIdsState, eventId]);
  };

  const addItem = (itemId) => {
    setItems([...itemIdsState, itemId]);
  };

  const locationPaths = book.locations[locationIdState].paths.map(
    path => {
      let reqMet = true
      path.requirements && (path.requirements.forEach((eventId) => {
        if (!(eventIdsState.includes(eventId))) {
          reqMet = false
        }
      })) // Checks paths for requirements
      return {
        reqMet: reqMet,
        toLocationId: path.toLocationId,
        name: path.name,
        description: path.description,
      }
    } 
  )

  const locationEvents =
    book.locations[locationIdState].events &&
    book.locations[locationIdState].events.map((eventId) => ({
      ...book.events[eventId],
      id: eventId,
      didHappen: eventIdsState.includes(eventId),
    }));

  const locationItems = 
    book.locations[locationIdState].items &&
    book.locations[locationIdState].items.map((item) => ({
      ...book.items[item.id],
      id: item.id,
      isPresent: !itemIdsState.includes(item.id),
      events: item.events.map((eventId) => ({
        ...book.events[eventId],
        id: eventId,
        didHappen: eventIdsState.includes(eventId),
      }))
    }));

  return (
    <main>
      <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400 text-center text-3xl font-sans">
        You are at
      </p>

      <Location
        name={book.locations[locationIdState].name}
        description={book.locations[locationIdState].description}
        events={locationEvents}
        items={locationItems}
        paths={locationPaths}
        setLocation={setLocation}
        addEvent={addEvent}
        addItem={addItem}
      />
    </main>
  );
};
