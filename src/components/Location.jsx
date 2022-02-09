import { ElementList, ElementHeader } from "../components/Elements";
import parse from "html-react-parser";

export const Location = ({
  name,
  description,
  items,
  npcs,
  paths,
  handleAction,
}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-green-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="Location" color="green" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">
        {parse(description)}
      </p>

      {items && (
        <ElementList
          type="Items"
          elements={items}
          handleAction={handleAction}
        />
      )}

      {npcs && (
        <ElementList type="Npcs" elements={npcs} handleAction={handleAction} />
      )}

      {paths && (
        <ElementList
          type="Paths"
          elements={paths}
          handleAction={handleAction}
        />
      )}
    </div>
  );
};

export default Location;
