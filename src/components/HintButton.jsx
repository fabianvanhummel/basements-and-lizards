import { Hint } from "./Hint";
import { useState } from "react";

export const HintButton = ({ hintText }) => {
  const [toggled, setToggled] = useState(false);

  const toggle = () => {
    setToggled(!toggled);
  };

  return (
    <div>
      <div
        className="rounded-full bg-green-600 max-w-max p-4 cursor-pointer absolute"
        onClick={toggle}
      >
        <img src="https://i.imgur.com/HnKEc18.png" width="80px" />
      </div>
      {toggled && (
        <Hint hintText={hintText} setToggled={setToggled} toggle={toggle} />
      )}
    </div>
  );
};
