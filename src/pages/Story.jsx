import { useState } from "react";
import { Location } from "../components/Location";

export const Story = ({ book }) => {
  const [location, setLocation] = useState(book["start-location"]);
  const [events, setEvents] = useState([]);

  const addEvent = (eventId) => {
    setEvents([...events, eventId]);
  };

  const locationEvents =
    book.locations[location].events &&
    book.locations[location].events.map((eventId) => ({
      ...book.events[eventId],
      id: eventId,
      hasHappened: events.includes(eventId),
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
        paths={book.locations[location].paths}
        setLocation={setLocation}
        addEvent={addEvent}
      />
    </main>
  );
};
