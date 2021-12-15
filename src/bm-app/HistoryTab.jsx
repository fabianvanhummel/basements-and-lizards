import "../index.css" // TODO: zorg dat dit global is geregeld in storybook

var historyArray = [];

export const HistoryTab = ({ locationHistory, travelBackInTime }) => {
  let stateHistory = locationHistory
  historyArray = Object.values(stateHistory)
  historyArray = historyArray.slice(-10)

  return (
    <div className="mx-auto max-w-sm px-8 py-4 my-10 bg-blue-50 rounded-lg shadow-md dark:bg-gray-800 ">
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
            <div className="max-w-sm my-2 px-4 py-2 bg-green-50 rounded-lg shadow-md">
              {historyArray.length - index === 1 ? "Latest" : 10 - index}:  {name}
              <button onClick={() => {
                travelBackInTime(index);
              }}
                className="text-black-600 max-w-sm mx-auto bg-red-100 px-1 rounded-lg shadow-md float-right">Back to here</button>
            </div>
          ))}
        </p>
      </div>
    </div>
  )
};

export default History;