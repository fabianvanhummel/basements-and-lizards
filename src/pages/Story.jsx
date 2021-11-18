import { useState } from "react";
import { Location } from "../components/Location";

export const Story = ({ book }) => {
  const [location, setLocation] = useState(book["start-location"]); // state

  return (
    <main>
      <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400">
        You are at
      </p>

      {/* TODO: add paths and events when they're added to maze.json */}
      <Location
        name={book.locations[location].name}
        description={book.locations[location].description}
      />
    </main>
  );
};
