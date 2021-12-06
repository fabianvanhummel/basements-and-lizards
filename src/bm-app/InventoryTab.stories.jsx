import React from "react";
import Faker from "faker";
import { InventoryTab } from "./InventoryTab";

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
  title: "BM App/InventoryTab",
  component: InventoryTab,
  decorators: [
    (StoryFn) => {
      return <ContextProvider book={itemStory}>{StoryFn()}</ContextProvider>;
    },
  ],
};

const Template = (args) => <InventoryTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
