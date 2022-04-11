import { DefaultButton } from "../components/Buttons";
import { ElementHeader } from "../components/Elements";

export const Combat = ({ id, title, description, handleAction }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-red-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={title} tag="Combat" color="red" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <div>
        <div className="text-center">
          <DefaultButton
            onClick={() => {
              handleAction({
                type: "END_COMBAT",
                combatId: id,
                combatTitle: title,
              });
            }}
          >
            Resolve combat
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default Combat;
