import { DefaultButton } from "../components/Buttons";
import { ElementHeader } from "../components/Elements";

export const Path = ({
  reqMet,
  toLocationId,
  name,
  description,
  events,
  handleAction,
}) => {
  return (
    <div className="max-w-2xl px-8 py-4 mx-auto bg-pink-50 rounded-lg shadow-md dark:bg-gray-800">
      <ElementHeader title={name} tag="Path" color="pink" />

      <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
        {description}
      </p>

      <DefaultButton
        children={"Follow this path to " + name}
        onClick={() =>
          handleAction({
            type: "TAKE_PATH",
            path: { name, description, toLocationId, events },
          })
        }
        disabled={!reqMet}
      />
    </div>
  );
};

export default Path;
