
import React from "react";
import _ from "lodash";

import {
    Row,
    Col4,
    Col8,
    Dialog,
    Divider,
    Button,
    Pulldown,
    TextField,
} from "mec-ui-widgets";

const STATE_OPTIONS = ['ACTIVE', 'INACTIVE'];
const SERIALIZER_OPTIONS = ['JSON', 'XML', 'PROTOBUF'];

const AddServiceDialog = (props) => {
    const {
        serName,
        version,
        state,
        serializer,
        transport,

        host,
        transportMap,

        onCancel,
        onSubmit,
        onNameChanged,
        onVersionChanged,
        onStateChanged,
        onSerializerChanged,
        onTransportChanged,
        onAddTransport,
    } = props;

    return (
        <Dialog
            title="Register Service"
            subtitle="Add a new service to the MEC service registry"
            style="active"
            footer={[
                (<Button
                    key="submit"
                    style="default"
                    onClick={() => onSubmit(
                        host,
                        {
                            serName,
                            version,
                            state,
                            serializer,
                            transportInfo: transportMap[transport],
                        }
                    )}>
                    Register service
                </Button>),
                <Button key="cancel" onClick={onCancel}>Cancel</Button>
            ]}
        >
            <TextField
                placeholder="Service name"
                value={serName}
                onChange={onNameChanged}
            />
            <p />
            <TextField
                placeholder="Service version"
                value={version}
                onChange={onVersionChanged}
            />
            <p />
            <Pulldown
                selected={state}
                onSelect={(item) => {
                    onStateChanged(item);
                }}
                items={_.map(STATE_OPTIONS, (item) => ({
                    key: item,
                    text: item,
                }))}
            />
            <p />
            <Pulldown
                selected={serializer}
                onSelect={(item) => {
                    onSerializerChanged(item);
                }}
                items={_.map(SERIALIZER_OPTIONS, (item) => ({
                    key: item,
                    text: item,
                }))}
            />
            <p />
            <Row>
                <Col8>
                    <Pulldown
                        selected={transport}
                        onSelect={(item) => {
                            onTransportChanged(item);
                        }}
                        items={_.map(transportMap, (val, key) => ({
                            key: key,
                            text: key,
                        }))}
                    />
                </Col8>
                <Col4>
                    <Button onClick={onAddTransport}>
                        New transport
                    </Button>
                </Col4>
            </Row>
            <p />
        </Dialog>
    );
};

export default AddServiceDialog;
