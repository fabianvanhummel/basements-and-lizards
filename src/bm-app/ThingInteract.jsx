import { DefaultButton } from "../components/Buttons";
import { ElementList, ElementHeader } from "../components/Elements";

export const ThingInteract = ({ name, description, options, handleAction }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-cyan-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="Thing" color="cyan" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <div>
        {options && (
          <ElementList
            type="ThingOptions"
            elements={options}
            handleAction={handleAction}
          />
        )}
        <div className="text-right">
          <DefaultButton
            onClick={() => {
              handleAction({
                type: "END_THING",
                npc: { name, description },
              });
            }}
          >
            Stop interacting
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default ThingInteract;
