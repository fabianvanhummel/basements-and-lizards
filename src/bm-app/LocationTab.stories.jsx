import React from "react";
import { LocationTab } from "./LocationTab";
import Faker from "faker";

import { ContextProvider } from "../bm-app/context";

const locationStory = {
  "start-location": "primary",
  locations: {
    primary: {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
    },
  },
};

export default {
  title: "BM App/LocationTab",
  component: LocationTab,
  decorators: [
    (StoryFn) => {
      return (
        <ContextProvider book={locationStory}>{StoryFn()}</ContextProvider>
      );
    },
  ],
};

const Template = (args) => <LocationTab />;

export const Primary = Template.bind({});
Primary.args = {};
