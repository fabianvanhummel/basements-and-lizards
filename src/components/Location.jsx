import { ButtonToggleBlocked } from "../components/Buttons";
import { ElementList } from "../components/Elements";

export const Location = ({
  name,
  description,
  events,
  items,
  npcs,
  paths,
  toggleShowBlockedState,
}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
          {name}
        </h1>
        <ButtonToggleBlocked toggleShowBlockedState={toggleShowBlockedState} />

        <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-green-600 rounded">
          Location
        </div>
      </div>

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {events && <ElementList type="Events" elements={events} />}

      {items && <ElementList type="Items" elements={items} />}

      {npcs && <ElementList type="Npcs" elements={npcs} />}

      {paths && <ElementList type="Paths" elements={paths} />}
    </div>
  );
};

export default Location;
