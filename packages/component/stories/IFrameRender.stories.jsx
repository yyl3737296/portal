import React from 'react';
import {storiesOf} from '@storybook/react';

import {IFrameRender} from '../src';

storiesOf('IFrameRender', module).add('default', () => (
    <IFrameRender height="600" src="https://www.baidu.com" width="1200" />
));
