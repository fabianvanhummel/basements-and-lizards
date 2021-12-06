import React from "react";
import Faker from "faker";
import { Path } from "./Path";

import { ContextProvider } from "../bm-app/context";

const pathStory = {
  "start-location": "dummy-start",
  locations: {
    "dummy-start": {
      paths: [
        {
          toLocationId: "primary",
        },
      ],
    },
    primary: {},
  },
  events: {
    primary: {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      message: Faker.lorem.sentences(),
    },
  },
};

export default {
  title: "Components/Path",
  component: Path,
  decorators: [
    (StoryFn) => {
      return <ContextProvider book={pathStory}>{StoryFn()}</ContextProvider>;
    },
  ],
};

const Template = (args) => <Path {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  toLocationId: "primary",
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
};

export const WithRequirements = Template.bind({});
WithRequirements.args = {
  toLocationId: Faker.lorem.word(),
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
  requirements: ["primary"],
};
