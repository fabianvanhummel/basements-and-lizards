import React from 'react';
import Faker from 'faker'
import { Path } from './Path';

export default {
  title: 'Components/Path',
  component: Path,
};

const Template = (args) => <Path {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  to: Faker.lorem.word(),
  description: Faker.lorem.sentences(),
  setLocation: () => {},
};