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

export const isPresentPrimary = Template.bind({});
isPresentPrimary.args = {
  isPresent: false,
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  events: Array(3).fill().map(() => ({
    didHappen: Faker.datatype.boolean(),
    message: Faker.lorem.sentences(),
  })),
  addItem: () => {},
  addEvent: () => {},
};

export const isPresentEmpty = Template.bind({});
isPresentEmpty.args = {
  isPresent: false,
  name: Faker.commerce.productName(),
  description: Faker.commerce.productDescription(),
  addItem: () => {},
};