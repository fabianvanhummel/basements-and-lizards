import { DefaultButton } from "./Buttons";
import { ElementHeader } from "./Elements";

export const Thing = ({ id, reqMet, name, description, handleAction }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-cyan-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="Thing" color="cyan" />

      <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
        {description}
      </p>

      <DefaultButton
        children={"Interact with " + name}
        onClick={() => {
          handleAction({
            type: "START_THING",
            thingId: id,
          });
        }}
        disabled={!reqMet}
      />
    </div>
  );
};

export default Thing;
