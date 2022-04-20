import React from "react";
import { Hint } from "./Hint";
import Faker from "faker";

export default {
  title: "Components/Hint",
};

export const HintPrimary = () => {
  return (
    <Hint
      hintText={Faker.lorem.sentences(5)}
      modalVisible={true}
      setToggled={() => {}}
      toggle={() => {}}
    />
  );
};
