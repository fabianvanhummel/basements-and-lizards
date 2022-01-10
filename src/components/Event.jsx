import { DefaultButton } from "../components/Buttons";

export const Event = ({
  id,
  name,
  description,
  reqMet,
  didHappen,
  message,
  addEvent,
}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-blue-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-700 dark:text-white">
          {name}
        </h1>
        <div className="px-3 py-1 text-sm font-bold text-gray-100 bg-blue-600 rounded">
          Event
        </div>
      </div>

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {didHappen ? (
        <p>{message}</p>
      ) : (
        <DefaultButton
          buttonText="Mark event as happened"
          onClick={() => {
            addEvent(id);
          }}
          isDisabled={!reqMet}
        />
      )}
    </div>
  );
};

export default Event;
