export const HistoryTab = ({ gameStateHistory, travelBackInTime, book }) => {
  // Create historyArray that can dynamically be filled from the current gamestatehistory
  var historyArray = [];

  // Function to deduce the location history from the gameStateHistory
  function deduceLocationHistory() {
    var historyNames = [];
    for (const key in gameStateHistory) {
      historyNames.push({
        locationName:
          book.locations[gameStateHistory[key][0].locationIdState].name,
        actionPerformed: gameStateHistory[key][0].changeLog,
      });
    }
    return historyNames;
  }

  // Color the types of changes that can occur in the BM App. Currently blue for events, yellow for items and green for locations - subject to change
  const colorMap = {
    "location-swap": "green",
    "event-happened": "blue",
    "item-added": "yellow",
  };

  // Deduce locations and changes from gameStateHistory to be used in mapping. Also everse array so the newest entry appears on top of the page
  historyArray = deduceLocationHistory(gameStateHistory).reverse();

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
                {index === 0 ? "Current" : index}: {name.locationName}
              </div>
              <button
                onClick={() => {
                  if (index === 0) {
                    alert("You are already here.");
                  } else {
                    travelBackInTime(index);
                  }
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
