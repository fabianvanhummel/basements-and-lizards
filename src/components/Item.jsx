import { DefaultButton } from "../components/Buttons";
import { ElementList, ElementHeader } from "../components/Elements";

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
    <ElementHeader title={name} tag="Item" color="yellow" />

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
    <ElementHeader title={name} tag="Item" color="yellow" />

    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

    {events && <ElementList type="Events" elements={events} />}
  </div>
);

export default Item;
