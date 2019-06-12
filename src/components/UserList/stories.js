import React from 'react';

import {storiesOf} from '@storybook/react';
import {QueryMessage} from './';

storiesOf('UserList / QueryMessage', module)
  .add('with message', () => <QueryMessage message="my name is guybrush threepwood" />);
