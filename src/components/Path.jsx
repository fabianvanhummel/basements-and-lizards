import { DefaultButton } from "../components/Buttons";
import { ElementList, ElementHeader } from "../components/Elements";

export const Path = ({
  reqMet,
  toLocationId,
  name,
  description,
  events,
  setLocation,
}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-pink-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="Path" color="pink" />

      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>

      <DefaultButton
        children={"Follow this path to " + toLocationId}
        onClick={() => {
          setLocation(toLocationId);
        }}
        isDisabled={!reqMet}
      />

      {events && <ElementList type="Events" elements={events} />}
    </div>
  );
};

export default Path;
