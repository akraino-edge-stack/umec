import React from "react";
import _ from "lodash";

import {
    Row,
    Col12,
    Pulldown,
    TextField,
} from "mec-hackathon-widgets";

const STATE_OPTIONS = ['ACTIVE', 'INACTIVE'];
const SERIALIZER_OPTIONS = ['JSON', 'XML', 'PROTOBUF'];

const AddServiceForm = (props) => {
    const {
        serName,
        version,
        state,
        serializer,

        onNameChanged,
        onVersionChanged,
        onStateChanged,
        onSerializerChanged,
    } = props;

    return (
        <React.Fragment>
            <Row>
                <Col12>
                    <TextField
                        placeholder="Service name"
                        value={serName}
                        onChange={(e) => onNameChanged(e.target.value)}
                    />
                </Col12>
            </Row>
            <Row>
                <Col12>
                    <TextField
                        placeholder="Service version"
                        value={version}
                        onChange={(e) => onVersionChanged(e.target.value)}
                    />
                </Col12>
            </Row>
            <Row>
                <Col12>
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
                </Col12>
            </Row>
            <Row>
                <Col12>
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
                </Col12>
            </Row>
        </React.Fragment>
    );
};

export default AddServiceForm;
