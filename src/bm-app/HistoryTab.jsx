const colorMap = {
  START_STORY: "purple",
  TAKE_PATH: "pink",
  TAKE_ITEM: "yellow",
  START_NPC: "purple",
  TALK_NPC: "purple",
  END_NPC: "purple",
  START_THING: "cyan",
  INTERACT_THING: "cyan",
  END_THING: "cyan",
  MOVE_COMBAT: "red",
  END_COMBAT: "red",
};

const textMap = {
  START_STORY: "You started your story in",
  TAKE_PATH: "You took a path to",
  TAKE_ITEM: "You took an item in",
  START_NPC: "You started talking to an NPC in",
  TALK_NPC: "You said something to an NPC in",
  END_NPC: "You ended your conversation with an NPC in",
  MOVE_COMBAT: "You made a move in an combat in",
  END_COMBAT: "You ended combat in",
};

export const HistoryTab = ({ history, handleAction }) => {
  const reversedHistory = history.slice().reverse();

  return (
    <div className="mx-auto max-w-xl px-8 py-4 my-10 bg-blue-50 rounded-lg shadow-md dark:bg-gray-800 ">
      <div className="flex items-start justify-between">
        <p className="text-gray-600 dark:text-gray-300 bold font-sans text-lg">
          The last actions you did were:
        </p>
        <div className="ml-2 px-3 py-1 text-sm font-bold text-gray-100 bg-blue-600 rounded">
          History
        </div>
      </div>
      <div>
        <div className="text-gray-600 dark:text-gray-300 bold font-sans text-base">
          {reversedHistory.map(({ gameState, changeLog }, index) => (
            <div
              key={index}
              className="flex justify-between mt-2 px-4 py-2 bg-green-50 shadow-md"
            >
              <div className="px-2 text-black-100">
                <div
                  className={`bg-${
                    colorMap[changeLog.action.type]
                  }-300 rounded-lg px-3 py-1`}
                >
                  {textMap[changeLog.action.type] +
                    " location " +
                    gameState.location}
                </div>
              </div>
              <button
                onClick={() => {
                  handleAction({ type: "BACK_IN_TIME", steps: index });
                }}
                className="text-black-600 bg-red-100 px-3 py-1 rounded-lg shadow-md"
              >
                Back to here
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
