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
};