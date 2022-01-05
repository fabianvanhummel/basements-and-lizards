export const HistoryTab = ({ gameStateHistory, travelBackInTime, book }) => {

  // Create historyArray that can dynamically be filled from the current gamestatehistory
  var historyArray = [];

  // Function to deduce the location history from the gameStateHistory
  function deduceLocationHistory() {
    var historyNames = [];
    for (const key in gameStateHistory) {
      historyNames.push([book.locations[gameStateHistory[key][0].locationIdState].name, gameStateHistory[key][0].changeLog])
    }
    return (historyNames)
  }

  // Color the types of changes that can occur in the BM App. Currently blue for events, yellow for items and green for locations - subject to change
  function setColor(value) {
    if (value === 'location-swap') {
      return 'bg-green-300 rounded-lg px-1 py-1 -my-1'
    } else if (value === 'event-happened') {
      return 'bg-blue-300 rounded-lg px-1 py-1 -my-1'
    } else {
      return 'bg-yellow-300 rounded-lg px-1 py-1 -my-1'
    }
  }

  // Deduce locations and changes from gameStateHistory to be used in mapping 
  historyArray = Object.values(deduceLocationHistory(gameStateHistory))

  // Reverse array so the newest entry appears on top of the page
  historyArray = historyArray.reverse()

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
            <div className="max-w-lg my-2 px-4 py-2 bg-green-50 shadow-md">
              <div className="float-left px-2 text-black-100 absolute">
                <div className={setColor(name[1])}>
                  {name[1]}
                </div>
              </div>
              <div className="text-center">
                {index === 0 ? "Latest" : index}: {name[0]}
              </div>
              <button onClick={() => {
                travelBackInTime(index);
              }}
                className="text-black-600 max-w-sm mx-auto bg-red-100 px-1 rounded-lg shadow-md float-right -my-6">Back to here</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default History;