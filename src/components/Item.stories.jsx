import React from "react";
import Faker from "faker";
import { Item } from "./Item";

import { ContextProvider } from "../bm-app/context";

const itemStory = {
  "start-location": "dummy-start",
  locations: {
    "dummy-start": {},
  },
  items: {
    primary: {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
    },
    "with-event": {
      name: Faker.lorem.word(),
      description: Faker.lorem.words(),
      events: ["primary"],
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
  title: "Components/Item",
  component: Item,
  decorators: [
    (StoryFn) => {
      return <ContextProvider book={itemStory}>{StoryFn()}</ContextProvider>;
    },
  ],
};

const Template = (args) => <Item {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: "primary",
};

export const WithEvent = Template.bind({});
WithEvent.args = {
  id: "with-event",
  events: ["primary"],
};
