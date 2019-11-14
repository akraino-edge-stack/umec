import React from "react";
import _ from "lodash";

import {
    Row,
    Col3,
    Divider,
    Button,
    Wizard,
} from "mec-hackathon-widgets";

import AddServiceForm from "./AddServiceForm"; import AddTransportForm from "./AddTransportForm";

const AddServiceWizard = (props) => {
    const {
        host,

        activeStep,

        serviceProps,
        transportProps,

        onCancel,
        onSubmit,
        onSetActiveStep,

        onServiceNameChanged,
        onServiceVersionChanged,
        onServiceStateChanged,
        onServiceSerializerChanged,
        onServiceTransportChanged,

        onTransportIdChanged,
        onTransportNameChanged,
        onTransportTypeChanged,
        onTransportProtocolChanged,
        onTransportVersionChanged,
        onTransportEndpointTypeChanged,
        onTransportEndpointUriChanged,
        onTransportAddEndpointUri,
    } = props;

    const steps = [
        {
            key: "addService",
            name: "Register a new service",
            component: (
                <React.Fragment>
                    <AddServiceForm
                        {...serviceProps}
                        onNameChanged={onServiceNameChanged}
                        onVersionChanged={onServiceVersionChanged}
                        onStateChanged={onServiceStateChanged}
                        onSerializerChanged={onServiceSerializerChanged}
                        onTransportChanged={onServiceTransportChanged}
                    />
                    <Divider />
                    <Row>
                        <Col3 />
                        <Col3>
                            <Button onClick={onCancel}>
                                Cancel
                            </Button>
                        </Col3>
                            <Button
                                style="default"
                                onClick={() => onSetActiveStep("addTransport")}
                            >
                                Next Step
                            </Button>
                        <Col3>
                        </Col3>
                        <Col3 />
                    </Row>
                </React.Fragment>
            ),
        },
        {
            key: "addTransport",
            name: "Add transport details",
            component: (
                <React.Fragment>
                    <AddTransportForm
                        {...transportProps}
                        onIdChanged={onTransportIdChanged}
                        onNameChanged={onTransportNameChanged}
                        onTypeChanged={onTransportTypeChanged}
                        onProtocolChanged={onTransportProtocolChanged}
                        onVersionChanged={onTransportVersionChanged}
                        onEndpointTypeChanged={onTransportEndpointTypeChanged}
                        onEndpointUriChanged={onTransportEndpointUriChanged}
                        onAddEndpointUri={onTransportAddEndpointUri}
                    />
                    <Divider />
                    <Row>
                        <Col3 />
                        <Col3>
                            <Button
                                onClick={() => onSetActiveStep("addService")}
                            >
                                Back
                            </Button>
                        </Col3>
                            <Button
                                style="default"
                                onClick={() => onSubmit(
                                    host,
                                    {
                                        ...serviceProps,
                                        transportInfo: {...transportProps},
                                    }
                                )}
                            >
                                Register Service
                            </Button>
                        <Col3>
                        </Col3>
                        <Col3 />
                    </Row>
                </React.Fragment>
            ),
        },
    ];

    let completed = true;
    _.each(steps, (step) => {
        if (step.key == activeStep) {
            step.active = true;
            completed = false;
        } else {
            step.active = false;
        }
        step.completed = completed;
    });

    return (
        <Wizard
            title="Register Service"
            style="active"
            steps={steps}
        />
    );
};

export default AddServiceWizard;
