import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Dashboard from "./Dashboard";
import {
    hostInputChanged,
    setHost,
} from "../data/actions/dashboard";
import {
    openWizard,
} from "../data/actions/wizard";
import { refreshServiceList } from "../data/actions/service";

const mapStateToProps = (state) => {
    const dashboard = state.dashboard;

    return {
        hostInput: dashboard.hostInput,
        host: dashboard.host,

        wizardOpen: state.wizard.isOpen,
    };
};

const mapDispatchToProps = {
    onHostInputChanged: (e) => hostInputChanged(e.target.value),
    onSetHost: (host) => (
        (dispatch) => {
            dispatch(setHost(host));
            dispatch(refreshServiceList(host));
        }
    ),
    onOpenWizard: openWizard,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Dashboard)
);
