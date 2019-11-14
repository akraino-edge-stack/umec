import React from "react";
import _ from "lodash";

import {
    ExpansionPanel,
    Row,
    Col6,
    Col12,
} from "mec-hackathon-widgets";

export default (props) => {
    const {
        service,

        onExpandDetails,
        onCloseDetails,
    } = props;

    const transport = service.transportInfo;

    return (
        <ExpansionPanel
            title={service.serName}
            description={`Instance ID: ${service.serInstanceId}`}
            expanded={service.open || false}
            onOpen={onExpandDetails}
            onClose={onCloseDetails}
        >
            <Row>
                <Col6>
                    <Row>
                        <Col12>Version: {service.version}</Col12>
                    </Row>
                    <Row>
                        <Col12>State: {service.state}</Col12>
                    </Row>
                    <Row>
                        <Col12>Serializer: {service.serializer}</Col12>
                    </Row>
                </Col6>
                <Col6>
                    <Row>
                        <Col12>Transport type: {transport.type}</Col12>
                    </Row>
                    <Row>
                        <Col12>
                            Protocol: {transport.protocol} ({transport.version})
                        </Col12>
                    </Row>
                </Col6>
            </Row>

            <Row>
                <Col12>
                    <Row>
                        <Col12>
                            <b>Transport endpoint {getEndpointType(transport.endpoint)}</b>
                        </Col12>
                    </Row>

                    {renderEndpoints(transport.endpoint)}
                </Col12>
            </Row>
        </ExpansionPanel>
    );
};

function getEndpointType(endpoint) {
    if (endpoint.uris !== undefined) {
        return "uris";
    } else if (endpoint.addresses !== undefined) {
        return "addresses";
    } else {
        return "(alternative)";
    }
}

function renderEndpoints(endpoint) {
    let data;
    if (endpoint.uris !== undefined) {
        data = _.map(endpoint.uris, (uri, index) => (
            <Row key={index}>
                <Col12>{uri}</Col12>
            </Row>
        ));
    } else if (endpoint.addresses !== undefined) {
        data = _.map(endpoint.addresses, (address, index) => (
            <Row key={index}>
                <Col12>
                    <b>Host:</b> {address.host},
                    <b>Port:</b> {address.port}
                </Col12>
            </Row>
        ));
    } else {
        data = JSON.stringify(endpoint.alternative);
    }

    return <React.Fragment>{data}</React.Fragment>;
}
