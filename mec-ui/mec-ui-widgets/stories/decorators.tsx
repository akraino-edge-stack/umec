import * as React from 'react';

import GlobalStyle from "../src/components/globalstyle/GlobalStyle";

export const globalStyleDecorator = (storyFn) => (
    <React.Fragment>
        <GlobalStyle />
        { storyFn() }
    </React.Fragment>
);
