import { useState } from "react";
import data from "./json/maze.json"; // book

function App() {
  const [location, setLocation] = useState(data["start-location"]); // state
  const [events, setEvents] = useState(data["events"]); // state

  const sortedPaths = data.locations[location].paths.map(
    path => {
      let reqMet = true
      path.requirements && (path.requirements.forEach((requirement) => {
        if (!(events[requirement].value)) {
          reqMet = false
        }
      })) // Checks paths for requirements
      return {reqMet,path}
    } 
  ).sort(
    (a,b) => {
      if(a.reqMet === b.reqMet){
        const nameA = a.path.to.toUpperCase(); // ignore upper and lowercase
        const nameB = b.path.to.toUpperCase(); // ignore upper and lowercase
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

  const handleTravelAction = (path) => {
    setEvents({
      ...events,
      message: null
    }); // Clears eventMessages
    if (data.locations[path.to].events) {
      data.locations[path.to].events.forEach((event) => {
        if (events[event].value !== events[event].eventValue) {
          const updatedEvent = events[event]
          updatedEvent.value = events[event].eventValue // Assign new values
          setEvents({
            ...events,
            [event]: updatedEvent,
            message: events[event].message
          }) // Update event State
        }
      })
    }; // Handles Events
    setLocation(path.to); // Updates Location
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

          {sortedPaths.map((sortedPath, index) => (
            <div key={index} className="flex items-center mt-2">
              <button
                onClick={() => {if (sortedPath.reqMet) {handleTravelAction(sortedPath.path)}}} // Travel Action
                className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
              >
                {sortedPath.reqMet ? data.locations[sortedPath.path.to].name : <strike> {data.locations[sortedPath.path.to].name} </strike>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
