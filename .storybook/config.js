import { configure, addParameters } from '@storybook/react';

function loadStories() {
  require('../stories');
}

addParameters({
  options: {
    showPanel: false,
  }
});

configure(loadStories, module);
