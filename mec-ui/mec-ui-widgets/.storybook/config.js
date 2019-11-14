import { configure, addDecorator } from '@storybook/react';

import { globalStyleDecorator } from "../stories/decorators.tsx";

addDecorator(globalStyleDecorator);

function loadStories() {
    // automatically import all story files
    const req = require.context('../stories', true, /\.stories\.ts(x)?$/);
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
