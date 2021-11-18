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
  message: Faker.lorem.sentences()
};