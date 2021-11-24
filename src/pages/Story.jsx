import { useState } from "react";
import { Location } from "../components/Location";
import { History } from "../components/History";
import "../index.css" // TODO: zorg dat dit global is geregeld in storybook

export const Story = ({ book }) => {
  const [location, setLocation] = useState(book["start-location"]);
  const [events, setEvents] = useState([]);
  const [history, setHistory] = useState([])

  const addEvent = (eventId) => {
    setEvents([...events, eventId]);
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
        id: path.id,
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

  return (
    <main>
      <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400">
        You are at
      </p>

      <Location
        name={book.locations[location].name}
        description={book.locations[location].description}
        events={locationEvents}
        paths={locationPaths}
        setLocation={setLocation}
        addEvent={addEvent}
        setHistory = {setHistory}
      />

      <History history={history}      
      />

    </main>
  );
};
