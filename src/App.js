import { useState } from "react";
import data from "./json/maze.json"; // book

function App() {
  const [location, setLocation] = useState(data["start-location"]); // state
  const [events, execEvent] = useState(data["events"]); // state

  const listedPaths = data.locations[location].paths.filter(
    path => {
      if (data.locations[path].requirements){
        let reqMet = true
        data.locations[path].requirements.forEach( (requirement) => {
          if (!(events[requirement].value)) {
            reqMet = false
          }
        })
        return reqMet
      }
      else {
        return true
      }
    } // Checks paths for requirements
  )

  const handleTravelAction = (path) => {
    execEvent({
      ...events,
      message: null
    }); // Clears eventMessages
    if (data.locations[path].events) {
      data.locations[path].events.forEach((event) => {
        if (events[event].value !== events[event].eventValue) {
          const updatedEvent = events[event]
          updatedEvent.value = events[event].eventValue // Assign new values
          execEvent({
            ...events,
            [event]: updatedEvent,
            message: events[event].message
          }) // Update event State
        }
      })
    }; // Handles Events
    setLocation(path); // Updates Location
  }

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
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {events.message}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-light text-gray-600 dark:text-gray-400">
            Move to:
          </p>

          {listedPaths.map((path, index) => (
            <div key={index} className="flex items-center mt-2">
              <button
                onClick={() => {handleTravelAction(path)}} // Travel Action
                className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
              >
                {data.locations[path].name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
