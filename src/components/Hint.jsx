export const Hint = ({ hintText, modalVisible, toggle }) => {
  return (
    modalVisible && (
      <div className="absolute m-auto	inset-1/4 bg-orange-200 rounded-lg z-10">
        <p className="font-serif text-5xl text-green-600 text-center py-4">
          Hint
        </p>
        <p className="font-serif text-lg text-green-600 mx-16 overflow-y-scroll max-h-80 ">
          {hintText}
        </p>
        <button
          className="absolute rounded-lg bg-green-200 max-w-max p-4 cursor-pointer right-2 bottom-2"
          onClick={toggle}
        >
          Close
        </button>
      </div>
    )
  );
};
