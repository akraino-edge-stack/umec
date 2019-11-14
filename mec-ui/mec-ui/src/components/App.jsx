import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../data/store";

import Root from "./Root";
import DashboardContainer from "./DashboardContainer";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Root>
                        <Route exact path="/" component={DashboardContainer} />
                    </Root>
                </Router>
            </Provider>
        );
    }
}
