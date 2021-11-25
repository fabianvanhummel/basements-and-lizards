import React from 'react';
import { PlayApp } from './PlayApp';
import maze from '../books/maze.json'

export default {
  title: 'Pages/PlayApp',
  component: PlayApp,
};

const Template = (args) => <PlayApp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  book: maze
};