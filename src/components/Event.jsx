import { DefaultButton } from "../components/Buttons";
import { ElementHeader } from "../components/Elements";

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
      <ElementHeader title={name} tag="Event" color="blue" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      {didHappen ? (
        <p>{message}</p>
      ) : (
        <DefaultButton
          children="Mark event as happened"
          onClick={() => {
            addEvent(id);
          }}
          disabled={!reqMet}
        />
      )}
    </div>
  );
};

export default Event;
