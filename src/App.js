import { useState } from "react";
import data from "./json/maze.json"; // book

function App() {
  const [location, setLocation] = useState(data["start-location"]); // state

  return (
    <main className="p-4 svg-background min-h-screen">
      <div className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <p className="text-sm font-light text-gray-600 dark:text-gray-400">
          The party is at:
        </p>

        <div className="mt-2">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
            {data.locations[location].name}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {data.locations[location].description}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-light text-gray-600 dark:text-gray-400">
            Move to:
          </p>

          {data.locations[location].directions.map((direction, index) => (
            <div key={index} className="flex items-center mt-2">
              <button
                onClick={() => setLocation(direction)} // action
                className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
              >
                {data.locations[direction].name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
