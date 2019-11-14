import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AddTransportDialog from "./AddTransportDialog";
import {
    closeDialog,
    addTransport,
    onIdChanged,
    onNameChanged,
    onTypeChanged,
    onProtocolChanged,
    onVersionChanged,
    onEndpointTypeChanged,
    onEndpointUriChanged,
    onAddEndpointUri,
} from "../data/actions/addTransportDialog";

const mapStateToProps = (state) => {
    const dialog = state.transport.dialog;

    return {
        id: dialog.id,
        name: dialog.name,
        type: dialog.type,
        protocol: dialog.protocol,
        version: dialog.version,
        endpoint: dialog.endpoint,
        security: dialog.security,
    };
};

const mapDispatchToProps = {
    onCancel: closeDialog,
    onSubmit: addTransport,
    onIdChanged: (e) => onIdChanged(e.target.value),
    onNameChanged: (e) => onNameChanged(e.target.value),
    onTypeChanged: onTypeChanged,
    onProtocolChanged: (e) => onProtocolChanged(e.target.value),
    onVersionChanged: (e) => onVersionChanged(e.target.value),
    onEndpointTypeChanged: onEndpointTypeChanged,
    onEndpointUriChanged: onEndpointUriChanged,
    onAddEndpointUri: onAddEndpointUri,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AddTransportDialog)
);
