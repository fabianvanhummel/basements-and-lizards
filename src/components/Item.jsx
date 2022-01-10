import { DefaultButton } from "../components/Buttons";
import { ElementList } from "../components/Elements";

export const Item = ({
  id,
  isPresent,
  reqMet,
  name,
  description,
  events,
  addItem,
}) => (
  <div className="max-w-2xl px-8 py-4 mx-auto bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-700 dark:text-white">
        {name}
      </h1>
      <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-yellow-600 rounded">
        Item
      </div>
    </div>

    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

    {!isPresent ? (
      <div>
        this item was looted
        {events && <ElementList type="Events" elements={events} />}
      </div>
    ) : (
      <DefaultButton
        buttonText={"Pick up " + name}
        onClick={() => {
          addItem(id);
        }}
        isDisabled={!reqMet}
      />
    )}
  </div>
);

export const InventoryItem = ({ name, description, events }) => (
  <div className="max-w-2xl px-8 py-4 mx-auto bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-700 dark:text-white">
        {name}
      </h1>
      <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-yellow-600 rounded">
        Item
      </div>
    </div>

    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

    {events && <ElementList type="Events" elements={events} />}
  </div>
);

export default Item;
