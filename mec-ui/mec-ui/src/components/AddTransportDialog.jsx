
import React from "react";
import _ from "lodash";

import {
    Row,
    Col3,
    Col9,
    Col12,
    Dialog,
    Divider,
    Button,
    Pulldown,
    TextField,
} from "mec-hackathon-widgets";

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

        onCancel,
        onSubmit,
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
        <Dialog
            title="Create Transport"
            subtitle="Create a new transport registration for the MEC service registry"
            style="active"
            footer={[
                (<Button
                    key="submit"
                    style="default"
                    onClick={() => onSubmit({
                        id,
                        name,
                        type,
                        protocol,
                        version,
                        endpoint,
                        security,
                    })}>
                    Create transport
                </Button>),
                <Button key="cancel" onClick={onCancel}>Cancel</Button>
            ]}
        >
            <TextField
                placeholder="Transport identifier"
                value={id}
                onChange={onIdChanged}
            />
            <p />
            <TextField
                placeholder="Transport name"
                value={name}
                onChange={onNameChanged}
            />
            <p />
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
            <p />
            <TextField
                placeholder="Protocol"
                value={protocol}
                onChange={onProtocolChanged}
            />
            <p />
            <TextField
                placeholder="Protocol version"
                value={version}
                onChange={onVersionChanged}
            />
            <p />
            <Divider />
            <p />
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
            <p />
        </Dialog>
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
