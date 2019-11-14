import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AddServiceDialog from "./AddServiceDialog";
import {
    closeDialog,
    addService,
    serviceNameChanged,
    serviceVersionChanged,
    serviceStateChanged,
    serviceSerializerChanged,
    serviceTransportChanged,
} from "../data/actions/addServiceDialog";
import {
    openDialog as openAddTransportDialog,
} from "../data/actions/addTransportDialog";

const mapStateToProps = (state) => {
    const dialog = state.service.dialog;
    const transportMap = state.transport.transportMap;

    return {
        host: state.dashboard.host,

        serName: dialog.serName,
        version: dialog.version,
        state: dialog.state,
        serializer: dialog.serializer,
        transport: dialog.transport,
        transportMap,
    };
};

const mapDispatchToProps = {
    onCancel: closeDialog,
    onSubmit: addService,
    onNameChanged: (e) => serviceNameChanged(e.target.value),
    onVersionChanged: (e) => serviceVersionChanged(e.target.value),
    onStateChanged: serviceStateChanged,
    onSerializerChanged: serviceSerializerChanged,
    onTransportChanged: serviceTransportChanged,
    onAddTransport: openAddTransportDialog,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AddServiceDialog)
);
