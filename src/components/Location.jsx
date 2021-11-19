import { Event } from "./Event";
import { Path } from "./Path";

export const Location = ({ name, description, events, paths, setLocation, addEvent }) => {
  const sortedPaths = 
    paths && paths.sort(
      (a,b) => {
        if(a.reqMet === b.reqMet){
          const NameToA = a.name ? a.name : a.to
          const NameToB = b.name ? b.name : b.to
          const nameA = NameToA.toUpperCase(); // ignore upper and lowercase
          const nameB = NameToB.toUpperCase(); // ignore upper and lowercase
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
    );
  return (
    <div class="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-700 dark:text-white">{name}</h1>
        <div class="px-3 py-1 text-sm font-bold text-gray-100 bg-green-600 rounded">
          Location
        </div>
      </div>

      <p class="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {events && (
        <div class="mt-4">
          <span class="text-sm font-light text-gray-600 dark:text-gray-400">
            Events
          </span>
          <ul>
            {events.map((event, index) => (
              <li key={index} class="mt-2">
                <Event {...event} addEvent={addEvent} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {sortedPaths && (
        <div class="mt-4">
          <span class="text-sm font-light text-gray-600 dark:text-gray-400">
            Paths
          </span>
          <ul>
            {sortedPaths.map((path, index) => (
              <li key={index} class="mt-2">
                <Path {...path} setLocation={setLocation} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};

export default Location;
