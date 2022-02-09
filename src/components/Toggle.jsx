import "./Toggle.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

const icons = [faCheck, faXmark];

library.add(...icons);

export const Toggle = ({}) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div>
      <input type="checkbox" id="switch" className="checkbox" />
      <label
        for="switch"
        className="toggle"
        onClick={() => setToggled(!toggled)}
      >
        <div className="w-10/12 m-auto flex items-center justify-between ">
          <FontAwesomeIcon
            className={toggled ? "opacity-100" : "opacity-0"}
            icon="fa-solid fa-check"
            size="2x"
            color="white"
          />
          <FontAwesomeIcon
            className={toggled ? "opacity-0" : "opacity-100"}
            icon="fa-solid fa-xmark"
            size="2x"
            color="white"
          />
        </div>
      </label>
    </div>
  );
};
