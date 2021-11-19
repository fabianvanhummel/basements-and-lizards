import { useState } from "react";
import { Location } from "../components/Location";

export const Story = ({ book }) => {
  const [location, setLocation] = useState(book["start-location"]);
  const [events, setEvents] = useState([]);

  const addEvent = (eventId) => {
    setEvents([...events, eventId]);
  };

  const sortedPaths = book.locations[location].paths.map(
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
        description: path.description,
      }
    } 
  ).sort(
    (a,b) => {
      if(a.reqMet === b.reqMet){
        const nameA = a.to.toUpperCase(); // ignore upper and lowercase
        const nameB = b.to.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      else if (a.reqMet) {
        return -1
      }
      return 1
    } // Sort locations on met requirements and alfabetic
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
        paths={sortedPaths}
        setLocation={setLocation}
        addEvent={addEvent}
      />
    </main>
  );
};
