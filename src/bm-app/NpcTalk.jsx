import { DefaultButton } from "../components/Buttons";
import { ElementList, ElementHeader } from "../components/Elements";

export const NpcTalk = ({ name, description, options, handleAction }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-purple-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="NPC" color="purple" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <div>
        {options && (
          <ElementList
            type="Options"
            elements={options}
            handleAction={handleAction}
          />
        )}
        <div className="text-right">
          <DefaultButton
            onClick={() => {
              handleAction({
                type: "END_NPC",
                npc: { name, description },
              });
            }}
          >
            End conversation
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default NpcTalk;
