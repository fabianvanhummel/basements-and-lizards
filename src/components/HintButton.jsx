import { Hint } from "./Hint";
import { useState } from "react";

export const HintButton = ({ hintText }) => {
  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    setToggled(!toggled);
  };

  return (
    <div className="flex max-w-2xl py-2 mx-auto">
      <div
        className="rounded-full bg-green-600 p-4 cursor-pointer"
        onClick={toggle}
      >
        <img src="https://i.imgur.com/HnKEc18.png" alt="hint" width="80px" />
      </div>
      {toggled && (
        <Hint hintText={hintText} setToggled={setToggled} toggle={toggle} />
      )}
    </div>
  );
};
