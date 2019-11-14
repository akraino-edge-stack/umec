import React from "react";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connectWithLifecycle } from "react-lifecycle-component";
import { createSelector } from "reselect";

import ServiceList from "./ServiceList";
import {
    refreshServiceList,
    expandDetails,
    closeDetails,
} from "../data/actions/service";
import {
    openDialog
} from "../data/actions/addServiceDialog";

const serviceListSelector = (state) => state.service.serviceList;

const mapStateToProps = (state) => {
    return {
        serviceList: serviceListSelector(state),
        refreshing: state.service.serviceListRequestInflight,
    };
};

const mapDispatchToProps = {
    componentDidMount: () => refreshServiceList(""),

    onRefresh: refreshServiceList,
    onExpandDetails: expandDetails,
    onCloseDetails: closeDetails,
};

export default withRouter(
    connectWithLifecycle(
        mapStateToProps,
        mapDispatchToProps,
    )(ServiceList)
);
