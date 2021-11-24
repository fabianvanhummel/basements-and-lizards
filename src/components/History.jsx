import "../index.css" // TODO: zorg dat dit global is geregeld in storybook

var historyArray = [];

export const History = ({ history }) => {
  historyArray.push(history)
  historyArray = historyArray.slice(-10)

  return (
    <div class="max-w-sm px-8 py-4 my-10 top-2 right-8 bg-blue-50 rounded-lg shadow-md dark:bg-gray-800 absolute">
      <div class="flex items-start justify-between">
        <p class="text-gray-600 dark:text-gray-300 bold font-sans text-lg">
          The past 10 paths are:
        </p>
        <div class="ml-2 px-3 py-1 text-sm font-bold text-gray-100 bg-blue-600 rounded">
          History
        </div>
      </div>
      <div >
        <p class="text-gray-600 dark:text-gray-300 bold font-sans text-base">
          {historyArray.map((name, index) => (
            <div class="max-w-sm my-2 px-4 py-2 mx-auto bg-green-50 rounded-lg shadow-md">
              {historyArray.length-index === 1? "Latest" : 10 - index}:  {name}
            </div>
          ))}
        </p>
      </div>
    </div>
  )
};

export default History;
