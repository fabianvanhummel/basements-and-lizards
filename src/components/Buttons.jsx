export const DefaultButton = ({ children, ...props }) => {
  return (
    <button
      className="mt-2 px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonToggleBlocked = ({
  showBlockedState,
  setShowBlockedState,
}) => {
  return (
    <button
      className="flex items-center justify-center sm:w-auto sm:mx-1 w-full px-2 py-1 font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500"
      onClick={() => setShowBlockedState(!showBlockedState)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 mx-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span className="mx-1">Toggle blocked elements</span>
    </button>
  );
};
