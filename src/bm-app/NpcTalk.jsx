import { DefaultButton } from "../components/Buttons";
import { ElementHeader } from "../components/Elements";

export const NpcTalk = ({ name, description, options, handleAction }) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-purple-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="NPC" color="purple" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      <div>
        {
          <ul>
            {options.map((option, index) => (
              <li key={index} className="mt-2">
                <DefaultButton
                  children={option.text}
                  onClick={() => {
                    handleAction({
                      type: "TALK_NPC",
                      option: option,
                    });
                  }}
                />
              </li>
            ))}
          </ul>
        }
        <div className="text-right">
          <DefaultButton
            children={"End conversation"}
            onClick={() => {
              handleAction({
                type: "END_NPC",
                npc: { name, description },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NpcTalk;
