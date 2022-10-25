export const Hint = ({ hintText, toggle }) => {
  return (
    <div className="absolute inset-x-0 bg-orange-200 rounded-lg">
      <p className="font-serif text-3xl text-green-600 text-center py-2">
        Hint
      </p>
      <p className="font-serif text-sm text-green-600 mx-2 py-2 overflow-auto max-h-80">
        {hintText}
      </p>
      <button
        className="rounded-lg bg-green-200 p-4 cursor-pointer flex mx-auto"
        onClick={toggle}
      >
        Close
      </button>
    </div>
  );
};
