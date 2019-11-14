import React from "react";
import _ from "lodash";

import {
    Row,
    Col12,
    Divider,
    Button,
    Pulldown,
    TextField,
} from "mec-ui-widgets";

const TYPE_OPTIONS = [
    'REST_HTTP',
    'MB_TOPIC_BASED', 'MB_ROUTING', 'MB_PUBSUB',
    'RPC', 'RPC_STREAMING',
    'WEBSOCKET',
];

const ENDPOINT_TYPE_OPTIONS = [
    'uris',
];

const AddTransportDialog = (props) => {
    const {
        id,
        name,
        type,
        protocol,
        version,
        endpoint,
        security,

        onIdChanged,
        onNameChanged,
        onTypeChanged,
        onProtocolChanged,
        onVersionChanged,

        onEndpointTypeChanged,
        onEndpointUriChanged,
        onAddEndpointUri,
    } = props;

    let endpointType = "uris";
    if (_.has(endpoint, "addresses")) {
        endpointType = "addresses";
    }

    return (
        <React.Fragment>
            <Row>
                <Col12>
                    <TextField
                        placeholder="Transport identifier"
                        value={id}
                        onChange={onIdChanged}
                    />
                </Col12>
            </Row>
            <Row>
                <Col12>
                    <TextField
                        placeholder="Transport name"
                        value={name}
                        onChange={onNameChanged}
                    />
                </Col12>
            </Row>
            <Row>
                <Col12>
                    <Pulldown
                        selected={type}
                        onSelect={(item) => {
                            onTypeChanged(item);
                        }}
                        items={_.map(TYPE_OPTIONS, (item) => ({
                            key: item,
                            text: item,
                        }))}
                    />
                </Col12>
            </Row>
            <Row>
                <Col12>
                    <TextField
                        placeholder="Protocol"
                        value={protocol}
                        onChange={onProtocolChanged}
                    />
                </Col12>
            </Row>
            <Row>
                <Col12>
                    <TextField
                        placeholder="Protocol version"
                        value={version}
                        onChange={onVersionChanged}
                    />
                </Col12>
            </Row>

            <Divider />

            <Row>
                <Col12>
                    <Pulldown
                        selected={endpointType}
                        onSelect={(item) => onEndpointTypeChanged(item)}
                        items={_.map(ENDPOINT_TYPE_OPTIONS, (item) => ({
                            key: item,
                            text: item,
                        }))}
                    />
                    {{
                        uris: () => renderUris(
                            onEndpointUriChanged,
                            onAddEndpointUri,
                            endpoint.uris
                        ),
                        addresses: () => undefined,
                    }[endpointType]()}
                </Col12>
            </Row>
        </React.Fragment>
    );
};

function renderUris(onChange, onAdd, uris) {
    return (
        <React.Fragment>
            {_.map(uris, (uri, index) => (
                <Row key={`uri_${index}`}>
                    <Col12>
                        <TextField
                            placeholder="Uri"
                            value={uri}
                            onChange={(e) => (
                                onChange({
                                    id: index,
                                    uri: e.target.value,
                                })
                            )}
                        />
                    </Col12>
                </Row>
            ))}
            <p />
            <Row>
                <Col12>
                    <Button onClick={onAdd}>
                        Add uri
                    </Button>
                </Col12>
            </Row>
        </React.Fragment>
    );
}

export default AddTransportDialog;
