import { useState } from "react";
import { Location } from "../components/Location";

export const Story = ({ book }) => {
  const [location, setLocation] = useState(book["start-location"]);
  const [events, setEvents] = useState([]);
  const [items, setItems] = useState([]);

  const addEvent = (eventId) => {
    setEvents([...events, eventId]);
  };

  const addItem = (itemId) => {
    setItems([...items, itemId]);
  };

  const locationPaths = book.locations[location].paths.map(
    path => {
      let reqMet = true
      path.requirements && (path.requirements.forEach((eventId) => {
        if (!(events.includes(eventId))) {
          reqMet = false
        }
      })) // Checks paths for requirements
      return {
        reqMet: reqMet,
        to: path.to,
        name: path.name,
        description: path.description,
      }
    } 
  )

  const locationEvents =
    book.locations[location].events &&
    book.locations[location].events.map((eventId) => ({
      ...book.events[eventId],
      id: eventId,
      hasHappened: events.includes(eventId),
    }));

  const locationItems = 
    book.locations[location].items &&
    book.locations[location].items.map((item) => ({
      ...book.items[item.id],
      id: item.id,
      isPickedUp: items.includes(item.id),
    }));

  return (
    <main>
      <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400">
        You are at
      </p>

      <Location
        name={book.locations[location].name}
        description={book.locations[location].description}
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
