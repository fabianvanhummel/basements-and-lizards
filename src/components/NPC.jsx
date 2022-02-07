import { useState } from "react";
import { DefaultButton } from "../components/Buttons";
import { ElementHeader } from "../components/Elements";

export const NPC = ({
  reqMet,
  name,
  description,
  conversation,
  addItem,
  addEvent,
  handleAction,
}) => {
  const [conversationStarted, setConversationStarted] = useState(false);
  const [conversationId, setConversationId] = useState("initial");

  const handleConsequences = (consequences) => {
    consequences.forEach((consequence) => {
      switch (consequence.type) {
        case "CONVERSATION":
          setConversationId(consequence.id);
          break;
        case "GET-ITEM":
          addItem(consequence.id);
          break;
        case "EXECUTE-EVENT":
          addEvent(consequence.id);
          break;
        default:
          // Do Nothing
          break;
      }
    });
  };

  const conversationHandler = () => {
    return (
      <div className="max-w-2xl px-8 py-4 mx-auto bg-purple-300 rounded-lg shadow-md dark:bg-gray-800">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {name + " Says:"}
        </span>
        <p>{conversation[conversationId].npcLine}</p>

        {conversation[conversationId].responses ? (
          <div className="mt-4">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400">
              How will you respond?
            </span>
            <ul>
              {conversation[conversationId].responses.map((response, index) => (
                <li key={index} className="mt-2">
                  <DefaultButton
                    children={response.text}
                    onClick={() => {
                      handleConsequences(response.consequences);
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="font-bold">The conversation is now over</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-purple-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="NPC" color="purple" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {!conversationStarted ? (
        <DefaultButton
          children={"Approach " + name}
          onClick={() => {
            handleAction({
              type: "START_NPC",
              npc: { name, description },
            });
            setConversationStarted(!conversationStarted);
          }}
          disabled={!reqMet}
        />
      ) : (
        <div>
          {conversationHandler()}
          <div className="text-right">
            <DefaultButton
              children={"End conversation"}
              onClick={() => {
                setConversationStarted(!conversationStarted);
                setConversationId("initial");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NPC;
