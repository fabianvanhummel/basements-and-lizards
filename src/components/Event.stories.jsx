import React from 'react';
import Faker from 'faker'
import { Event } from './Event';

export default {
  title: 'Components/Event',
  component: Event,
};

const Template = (args) => <Event {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  message: Faker.lorem.sentences(),
  addEvent: () => {},
};

export const hasHappened = Template.bind({});
hasHappened.args = {
  hasHappened: true,
  message: Faker.lorem.sentences(),
  addEvent: () => {},
};