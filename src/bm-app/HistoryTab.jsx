const colorMap = {
  START_STORY: "purple",
  TAKE_PATH: "purple",
  TAKE_ITEM: "yellow",
  START_NPC: "blue",
  TALK_NPC: "blue",
  END_NPC: "blue",
  MOVE_COMBAT: "red",
  END_COMBAT: "red",
};


export const HistoryTab = ({ history, handleAction }) => {
  const reversedHistory = history.slice().reverse();

  return (
    <div className="mx-auto max-w-xl px-8 py-4 my-10 bg-blue-50 rounded-lg shadow-md dark:bg-gray-800 ">
      <div className="flex items-start justify-between">
        <p className="text-gray-600 dark:text-gray-300 bold font-sans text-lg">
          The past 10 paths are:
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
              className="max-w-lg my-2 px-4 py-2 bg-green-50 shadow-md"
            >
              <div className="float-left px-2 text-black-100 absolute">
                <div
                  className={`bg-${
                    colorMap[changeLog.action.type]
                  }-300 rounded-lg px-1 py-1 -my-1`}
                >
                  {textMap[changeLog.action.type] +
                    " location " +
                    gameState.location}
                </div>
              </div>
              <div className="text-center">
                {index === 0 ? "Latest" : index}: {name.locationName}
              </div>
              <button
                onClick={() => {
                  handleAction({ type: "BACK_IN_TIME", steps: index });
                }}
                className="text-black-600 max-w-sm mx-auto bg-red-100 px-1 rounded-lg shadow-md float-right -my-6"
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
