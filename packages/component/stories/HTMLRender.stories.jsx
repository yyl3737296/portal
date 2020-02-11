import React from 'react';
import {storiesOf} from '@storybook/react';

import {HTMLRender} from '../src';

const html = `
<div>
    <section but='yes'>Section 1</section>
    <section id='remove'>Section 2</section>
    <script src="/1.js"></script>
    <script type="text/javascript">
    console.log(123)
    </script>
    <div id='login-Placeholder'></div>
    <div login></div>
    <div login-placeholder></div>
    <a href="Javascript:alert(1)">TEST</a>
    <div>
        <section but='yes'>Section 1</section>
        <section id='remove'>Section 2</section>
        <script src="/1.js"></script>
        <script type="text/javascript">
        console.log(123)
        </script>
        <div id='login-placeholder'></div>
        <div login></div>
        <div login-placeholder></div>
        <a href="javascript:alert(1)">TEST</a>
    </div>
    <div onClick="alert(123)" onLoad="alert(2324)">123</div>
</div>
`;

storiesOf('HTMLRender', module).add('default', () => (
    <HTMLRender html={html} login-placeholder={<div>{'Here is the user/login menu.'}</div>} />
));
