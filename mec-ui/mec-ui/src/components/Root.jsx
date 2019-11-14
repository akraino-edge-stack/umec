import React from "react";

import { GlobalStyle } from "mec-ui-widgets";

export default class Root extends React.Component {
    render() {
        return (
            <React.Fragment>
                <GlobalStyle />
                {this.props.children}
            </React.Fragment>
        );
    }
};
