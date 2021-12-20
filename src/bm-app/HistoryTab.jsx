import "../index.css" // TODO: zorg dat dit global is geregeld in storybook

var historyArray = [];
function setColor(value) {
  if (value === 'location-swap') {
    return 'bg-blue-300 rounded-lg px-1 py-1 -my-1'
  } else if (value === 'event-happened') {
    return 'bg-red-300 rounded-lg px-1 py-1 -my-1'
  } else {
    return 'bg-green-300 rounded-lg px-1 py-1 -my-1'
  }
}

export const HistoryTab = ({ gameStateHistory, travelBackInTime, deduceLocationHistory }) => {

  let stateHistory = gameStateHistory
  historyArray = Object.values(deduceLocationHistory(stateHistory))
  historyArray = historyArray.slice(-10)

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
        <p className="text-gray-600 dark:text-gray-300 bold font-sans text-base">
          {historyArray.map((name, index) => (
            <div className="max-w-lg my-2 px-4 py-2 bg-green-50 shadow-md">
              <div className="float-left px-2 text-black-100 absolute">
                <div className={setColor(name[1])}>
                  {name[1]}
                </div>
              </div>
              <div className="text-center">
                {historyArray.length - index === 1 ? "Latest" : 10 - index}:  {name[0]}
              </div>
              <button onClick={() => {
                travelBackInTime(index);
              }}
                className="text-black-600 max-w-sm mx-auto bg-red-100 px-1 rounded-lg shadow-md float-right -my-6">Back to here</button>
            </div>
          ))}
        </p>
      </div>
    </div>
  )
};

export default History;