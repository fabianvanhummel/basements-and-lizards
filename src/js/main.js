import { filterDirections } from "./functions/filterDirections";
import { mapDirections } from "./functions/mapDirections";

export function main(data, location, triggers, setLocation, setTrigger) {
  
  return(
<div className="p-4 svg-background min-h-screen fade-in-2s">
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
            {triggers.message}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm font-light text-gray-600 dark:text-gray-400">
            Move to:
          </p>
          {
            // In functies verdeeld, zodat de losse logica makkelijker aan te passen is later
            mapDirections(
              filterDirections(
                data, location, triggers
              ),
              data, triggers, setLocation, setTrigger
            )
          }
        </div>
      </div>
    </div>
  )
}