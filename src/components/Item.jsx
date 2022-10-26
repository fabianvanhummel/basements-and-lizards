import { DefaultButton } from "../components/Buttons";
import { ElementHeader } from "../components/Elements";

export const Item = ({
  id,
  reqMet,
  name,
  description,
  events,
  toLocationId,
  handleAction,
}) => (
  <div className="max-w-2xl px-8 py-4 mx-auto bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800">
    <ElementHeader title={name} tag="Item" color="yellow" />

    <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
      {description}
    </p>

    <DefaultButton
      children={"Pick up " + name}
      onClick={() =>
        handleAction({
          type: "TAKE_ITEM",
          item: { id, name, description, events, toLocationId },
        })
      }
      disabled={!reqMet}
    />
  </div>
);

export const InventoryItem = ({ name, description, image }) => (
  <div className="max-w-2xl px-8 py-4 mx-auto bg-yellow-50 rounded-lg shadow-md dark:bg-gray-800">
    <ElementHeader title={name} tag="Item" color="yellow" />

    <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
      {description}
    </p>
    {image && (
      <DefaultButton
        children={"Show item"}
        onClick={() => {
          window.open(
            image,
            "targetWindow",
            "toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1090px, height=550px, top=25px left=120px",
          );
        }}
      />
    )}
  </div>
);

export default Item;
