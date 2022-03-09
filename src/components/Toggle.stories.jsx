import React from "react";
import { Toggle } from "./Toggle";
import { useState } from "react";

export default {
  title: "Components/Toggle",
};

export const TogglePrimary = () => {
  const [toggled, setToggled] = useState(false);
  return <Toggle toggled={toggled} toggle={(toggled) => setToggled(toggled)} />;
};
