import { DefaultButton } from "./Buttons";
import { ElementHeader } from "./Elements";

export const Npc = ({ reqMet, name, description, handleAction }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-purple-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="NPC" color="purple" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      <DefaultButton
        children={"Approach " + name}
        onClick={() => {
          handleAction({
            type: "START_NPC",
            npc: { name, description },
          });
        }}
        disabled={!reqMet}
      />
    </div>
  );
};

export default Npc;
