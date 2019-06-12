import React from 'react';

import {storiesOf} from '@storybook/react';
import UserListItem from './';

storiesOf('UserList / UserListItem', module)
  .add('with message', () => <UserListItem login="login" name="guybrush threepwood" avatarUrl="https://placehold.it/200x200" />);
