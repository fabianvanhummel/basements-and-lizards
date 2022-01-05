import React from "react";
import Faker from "faker";
import { NPC } from "./NPC";

export default {
  title: "Components/NPC",
  component: NPC,
};

const Template = (args) => <NPC {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  reqMet: true,
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
  conversation: {
    initial: {
      npcLine: Faker.lorem.sentence(),
      responses: [
        {
          text: Faker.lorem.sentence(),
          consequences: [
            {
              type: "CONVERSATION",
              id: 1,
            },
          ],
        },
      ],
    },
    1: {
      npcLine: Faker.lorem.sentence(),
      responses: [
        {
          text: Faker.lorem.sentence(),
          consequences: [
            {
              type: "CONVERSATION",
              id: 2,
            },
          ],
        },
        {
          text: "Bye!",
          consequences: [
            {
              type: "CONVERSATION",
              id: "end-conversation",
            },
          ],
        },
      ],
    },
    2: {
      npcLine: Faker.lorem.sentence(),
      responses: [
        {
          text: Faker.lorem.sentence(),
          consequences: [
            {
              type: "CONVERSATION",
              id: 1,
            },
          ],
        },
        {
          text: "Bye!",
          consequences: [
            {
              type: "CONVERSATION",
              id: "end-conversation",
            },
          ],
        },
      ],
    },
    "end-conversation": {
      npcLine: "Ok, Bye!",
    },
  },
};

export const GivesItem = Template.bind({});
GivesItem.args = {
  reqMet: true,
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
  conversation: {
    initial: {
      npcLine: Faker.lorem.sentence(),
      responses: [
        {
          text: "Item plz?",
          consequences: [
            {
              type: "CONVERSATION",
              id: "item-offered",
            },
          ],
        },
        {
          text: "Bye!",
          consequences: [
            {
              type: "CONVERSATION",
              id: "end-conversation",
            },
          ],
        },
      ],
    },
    "item-offered": {
      npcLine: "Sure, want this Crappy item?",
      responses: [
        {
          text: "Yes, thank you!",
          consequences: [
            {
              type: "GET-ITEM",
              id: "crappy-item",
            },
            {
              type: "CONVERSATION",
              id: "initial",
            },
          ],
        },
      ],
    },
    "end-conversation": {
      npcLine: "Ok, Bye!",
    },
  },
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  reqMet: false,
  name: Faker.name.findName(),
  description: Faker.lorem.sentences(),
};
