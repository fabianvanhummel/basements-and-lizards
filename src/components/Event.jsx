export const Event = ({ id, hasHappened, message, addEvent }) => (
  <div class="max-w-2xl px-8 py-4 mx-auto bg-blue-50 rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex items-start justify-between">
      <p class="text-gray-600 dark:text-gray-300">{message}</p>
      <div class="ml-2 px-3 py-1 text-sm font-bold text-gray-100 bg-blue-600 rounded">
        Event
      </div>
    </div>

    {hasHappened ? (
      <p>has happened</p>
    ) : (
      <button
        onClick={() => addEvent(id)}
        class="mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
      >
        Mark event as happened
      </button>
    )}
  </div>
);

export default Event;
