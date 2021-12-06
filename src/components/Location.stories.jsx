import React from "react";
import Faker from "faker";
import { Location } from "./Location";

import { ContextProvider } from "../bm-app/context";

const locationStory = {
  "start-location": "primary",
  locations: {
    primary: {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      paths: [
        {
          name: Faker.lorem.word(),
          description: Faker.lorem.words(),
          toLocationId: "with-elements",
        },
        {
          name: Faker.lorem.word(),
          description: Faker.lorem.words(),
          toLocationId: "with-requirements",
          requirements: ["primary"],
        },
      ],
    },
    "with-elements": {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      paths: [
        {
          name: Faker.lorem.word(),
          description: Faker.lorem.words(),
          toLocationId: "primary",
        },
        {
          name: Faker.lorem.word(),
          description: Faker.lorem.words(),
          toLocationId: "with-requirements",
          requirements: ["primary"],
        },
      ],
      items: [
        {
          id: "primary",
        },
      ],
      events: ["primary"],
    },
    "with-requirements": {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      paths: [
        {
          name: Faker.lorem.word(),
          description: Faker.lorem.words(),
          toLocationId: "primary",
        },
      ],
    },
  },
  items: {
    primary: {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
    },
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
  title: "Components/Location",
  component: Location,
  decorators: [
    (StoryFn) => {
      return (
        <ContextProvider book={locationStory}>{StoryFn()}</ContextProvider>
      );
    },
  ],
};

const Template = (args) => <Location {...args} />;

export const Primary = Template.bind({});
// Note: this is not what the actual data structure is like.
Primary.args = {};
