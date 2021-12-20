import React from "react";
import { Location } from "../components/Location";

export const LocationTab = ({
  name,
  description,
  events,
  items,
  paths,
  setLocation,
  addEvent,
  addItem,
  toggleShowBlockedState,
}) => (
  <div className="p-4">
    <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400 text-center text-3xl font-sans">
      You are at
    </p>
    <Location
      name={name}
      description={description}
      events={events}
      items={items}
      paths={paths}
      setLocation={setLocation}
      addEvent={addEvent}
      addItem={addItem}
      toggleShowBlockedState={toggleShowBlockedState}
    />
  </div>
);
