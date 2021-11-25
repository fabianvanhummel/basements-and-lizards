import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Location } from "../components/Location";
import { HistoryTab } from "../pages/HistoryTab";

export const BMApp = ({ book }) => {
  const [location, setLocation] = useState(book["start-location"]);
  const [events, setEvents] = useState([]);
  const [items, setItems] = useState([]);

  const addEvent = (eventId) => {
    setEvents([...events, eventId]);
  };

  const addItem = (itemId) => {
    setItems([...items, itemId]);
  };

  const locationPaths = book.locations[location].paths.map((path) => {
    let reqMet = true;
    path.requirements &&
      path.requirements.forEach((eventId) => {
        if (!events.includes(eventId)) {
          reqMet = false;
        }
      }); // Checks paths for requirements
    return {
      reqMet: reqMet,
      to: path.to,
      name: path.name,
      description: path.description,
    };
  });

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
      events: item.events.map((eventId) => ({
        ...book.events[eventId],
        id: eventId,
        hasHappened: events.includes(eventId),
      })),
    }));

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<div>StartTabPlaceholder</div>} />

        <Route
          path="/location"
          element={
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
          }
        />

        <Route path="/inventory" element={<div>InventoryTabPlaceholder</div>} />

        <Route path="/history" element={<HistoryTab />} />
      </Routes>
    </BrowserRouter>
  );
};
