import React from "react";
import { HintButton } from "./HintButton";
import Faker from "faker";

export default {
  title: "Components/HintButton",
};

export const HintPrimary = () => {
  return <HintButton hintText={Faker.lorem.sentences(5)} />;
};
