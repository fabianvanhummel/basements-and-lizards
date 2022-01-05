import { useState } from "react";

export const NPC = ({ reqMet, name, description, conversation, addItem }) => {
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
                  <button
                    onClick={() => {
                      handleConsequences(response.consequences);
                    }}
                    className="disabled:opacity-50 disabled:pointer-events-none disabled:cursor-auto mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
                  >
                    {response.text}
                  </button>
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
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-700 dark:text-white">
          {name}
        </h1>
        <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-purple-600 rounded">
          NPC
        </div>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {!conversationStarted ? (
        <button
          disabled={!reqMet}
          onClick={() => {
            setConversationStarted(!conversationStarted);
          }}
          className="disabled:opacity-50 disabled:pointer-events-none disabled:cursor-auto mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
        >
          {"Approach " + name}
        </button>
      ) : (
        <div>
          {conversationHandler()}
          <div className="text-right">
            <button
              onClick={() => {
                setConversationStarted(!conversationStarted);
                setConversationId("initial");
              }}
              className="disabled:opacity-50 disabled:pointer-events-none disabled:cursor-auto mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
            >
              End conversation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPC;
