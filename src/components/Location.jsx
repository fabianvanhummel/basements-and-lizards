import { ElementList, ElementHeader } from "../components/Elements";

export const Location = ({ name, description, events, items, npcs, paths }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="Location" color="green" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {events && <ElementList type="Events" elements={events} />}

      {items && <ElementList type="Items" elements={items} />}

      {npcs && <ElementList type="Npcs" elements={npcs} />}

      {paths && <ElementList type="Paths" elements={paths} />}
    </div>
  );
};

export default Location;
