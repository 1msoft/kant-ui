import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import config from './pages';
import './assets/styles/index';

import 'highlight.js/styles/github.css';

const setStoriesOf = () => {
  config.forEach(v => {
    v.parents.forEach(info => {
      storiesOf(v.title, module).add(info.title, info.component);
    });
  });
};

setStoriesOf();
