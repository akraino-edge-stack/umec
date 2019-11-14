import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AddServiceWizard from "./AddServiceWizard";
import { setActiveStep, closeWizard } from "../data/actions/wizard";
import { addService } from "../data/actions/service";
import * as serviceActions from "../data/actions/addServiceDialog";
import * as transportActions from "../data/actions/addTransportDialog";

const mapStateToProps = (state) => {
    const wizard = state.wizard;
    const service = state.addServiceDialog;
    const transport = state.addTransportDialog;

    return {
        host: state.dashboard.host,

        activeStep: wizard.activeStep,

        serviceProps: service,
        transportProps: transport,
    };
};

const mapDispatchToProps = {
    onCancel: closeWizard,
    onSubmit: (host, service) => (
        (dispatch) => {
            dispatch(addService(host, service));
            dispatch(closeWizard());
        }
    ),
    onSetActiveStep: setActiveStep,

    onServiceNameChanged: serviceActions.serviceNameChanged,
    onServiceVersionChanged: serviceActions.serviceVersionChanged,
    onServiceStateChanged: serviceActions.serviceStateChanged,
    onServiceSerializerChanged: serviceActions.serviceSerializerChanged,

    onTransportIdChanged: (e) => transportActions.onIdChanged(e.target.value),
    onTransportNameChanged: (e) => transportActions.onNameChanged(e.target.value),
    onTransportTypeChanged: transportActions.onTypeChanged,
    onTransportProtocolChanged: (e) => transportActions.onProtocolChanged(e.target.value),
    onTransportVersionChanged: (e) => transportActions.onVersionChanged(e.target.value),
    onTransportEndpointTypeChanged: transportActions.onEndpointTypeChanged,
    onTransportEndpointUriChanged: transportActions.onEndpointUriChanged,
    onTransportAddEndpointUri: transportActions.onAddEndpointUri,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AddServiceWizard)
);
