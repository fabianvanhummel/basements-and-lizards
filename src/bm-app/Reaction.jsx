const colorMap = {
  EVENT_HAPPENS: "blue",
  FOLLOW_PATH: "purple",
  ARRIVE_AT_LOCATION: "green",
  PICK_UP_ITEM: "yellow",
};

const titleMap = {
  EVENT_HAPPENS: "An event happened",
  FOLLOW_PATH: "You follow a path",
  ARRIVE_AT_LOCATION: "You arrive at a location",
  PICK_UP_ITEM: "You picked up an item",
};

export const Reaction = ({ type, dismiss, ...props }) => (
  <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div
      className={`flex-none flex items-center justify-center w-12 bg-${colorMap[type]}-500`}
    >
      <svg
        className="w-6 h-6 text-white fill-current"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
      </svg>
    </div>

    <div className="px-4 py-2 -mx-3 flex-auto">
      <div className="mx-3">
        <span
          className={`font-semibold text-${colorMap[type]}-500 dark:text-${colorMap[type]}-400`}
        >
          {titleMap[type]}
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          {props.message}
        </p>
      </div>
    </div>

    <button
      className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none self-center mr-3"
      onClick={dismiss}
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18L18 6M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);
