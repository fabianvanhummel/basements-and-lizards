import React from 'react';
import Faker from 'faker'
import { Item } from './Item';

export default {
  title: 'Components/Item',
  component: Item,
};

const Template = (args) => <Item {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  addItem: () => {},
};

export const isPickedUpPrimary = Template.bind({});
isPickedUpPrimary.args = {
  isPickedUp: true,
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  events: Array(3).fill().map(() => ({
    hasHappened: Faker.datatype.boolean(),
    message: Faker.lorem.sentences(),
  })),
  addItem: () => {},
  addEvent: () => {},
};

export const isPickedUpEmpty = Template.bind({});
isPickedUpEmpty.args = {
  isPickedUp: true,
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  addItem: () => {},
};