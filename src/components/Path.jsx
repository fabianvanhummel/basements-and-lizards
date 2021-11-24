
export var PathHistory = [];

export const Path = ({ reqMet, to, name, id, description, setLocation,
  setHistory }) => (
  <div class="max-w-2xl px-8 py-4 mx-auto bg-pink-50 rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-700 dark:text-white">
        {name ? name : to}
      </h1>
      <div class="px-3 py-1 text-sm font-bold text-gray-100 bg-pink-600 rounded">
        Path
      </div>
    </div>

    <p class="mt-2 text-gray-600 dark:text-gray-300">
      {description}
    </p>

    <button
      onClick={() => {if (reqMet) {pathChangeHandler(to, name, setLocation, setHistory)}}}
      class="mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
    >
      {reqMet ? "Follow this path to " + to : <strike> {"Follow this path to " + to} </strike>}
    </button>
  </div>
);

function pathChangeHandler(to, name, setLocation, setHistory) {
  setHistory(name)
  setLocation(to)
}

export default Path;