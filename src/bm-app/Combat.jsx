import { DefaultButton } from "../components/Buttons";
import { ElementList, ElementHeader } from "../components/Elements";

export const Combat = ({ title, description, options, handleAction }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-red-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={title} tag="Combat" color="red" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <div>
        {options && (
          <ElementList
            type="CombatOptions"
            elements={options}
            handleAction={handleAction}
          />
        )}
        <div className="text-center">
          <DefaultButton
            onClick={() => {
              handleAction({
                type: "END_COMBAT",
                combatTitle: title,
              });
            }}
          >
            Leave combat
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default Combat;
