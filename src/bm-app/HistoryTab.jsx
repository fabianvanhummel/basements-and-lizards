const colorMap = {
  TAKE_PATH: "purple",
  TAKE_ITEM: "yellow",
  START_NPC: "blue",
  TALK_NPC: "blue",
  END_NPC: "blue",
  START_THING: "cyan",
  INTERACT_THING: "cyan",
  END_THING: "cyan",
  MOVE_COMBAT: "red",
  END_COMBAT: "red",
};

export const HistoryTab = ({ book, history, handleAction }) => {
  // Create historyArray that can dynamically be filled from the current history
  var historyArray = [];

  // Function to deduce the location history from the history
  function deduceLocationHistory() {
    var historyNames = [];
    for (const key in history) {
      historyNames.push({
        locationName: book.locations[history[key].gameState.location].name,
        actionPerformed: history[key].changeLog.action.type || "TAKE_PATH",
      });
    }
    return historyNames;
  }

  // Deduce locations and changes from history to be used in mapping. Also everse array so the newest entry appears on top of the page
  historyArray = deduceLocationHistory(history).reverse();

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
          {historyArray.map((name, index) => (
            <div
              key={index}
              className="max-w-lg my-2 px-4 py-2 bg-green-50 shadow-md"
            >
              <div className="float-left px-2 text-black-100 absolute">
                <div
                  className={`bg-${
                    colorMap[name.actionPerformed]
                  }-300 rounded-lg px-1 py-1 -my-1`}
                >
                  {name.actionPerformed}
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
