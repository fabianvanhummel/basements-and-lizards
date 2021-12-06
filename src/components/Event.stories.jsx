import React from "react";
import Faker from "faker";
import { Event } from "./Event";

import { ContextProvider } from "../bm-app/context";

const eventStory = {
  "start-location": 1,
  locations: {
    1: {},
  },
  events: {
    1: {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      message: Faker.lorem.sentences(),
    },
  },
};

export default {
  title: "Components/Event",
  component: Event,
  decorators: [
    (StoryFn) => {
      return <ContextProvider book={eventStory}>{StoryFn()}</ContextProvider>;
    },
  ],
};

const Template = (args) => <Event {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: "1",
};
