import React from 'react';
import {storiesOf} from '@storybook/react';

import {Button} from '../src';

storiesOf('Button', module).add('default', () => <Button text="abcdefXXX">{'ButtonText'}</Button>);
