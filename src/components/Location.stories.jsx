import React from 'react';
import Faker from 'faker';
import { Location } from './Location';

export default {
  title: 'Components/Location',
  component: Location,
};

const Template = (args) => <Location {...args} />;

export const Primary = Template.bind({});
// Note: this is not what the actual data structure is like.
Primary.args = {
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
  events: Array(3).fill().map(() => ({
    message: Faker.lorem.sentences(),
  })),
  paths: Array(3).fill().map(() => ({
    to: Faker.address.city(),
    description: Faker.lorem.sentences(),
  })),
  setLocation: () => {},
};

export const Empty = Template.bind({});
Empty.args = {
  name: Faker.address.city(),
  description: Faker.lorem.sentences(),
};