import "../index.css" // TODO: zorg dat dit global is geregeld in storybook

export const Event = ({ message }) => (
  <div class="max-w-2xl px-8 py-4 mx-auto bg-blue-50 rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex items-start justify-between">
      <p class="text-gray-600 dark:text-gray-300">{message}</p>
      <div class="ml-2 px-3 py-1 text-sm font-bold text-gray-100 bg-blue-600 rounded">
        Event
      </div>
    </div>
  </div>
);

export default Event;
