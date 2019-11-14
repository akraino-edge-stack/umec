import PropTypes from "prop-types";

import actions from "../actionTypes";
import { asAction } from "../actionTypes";
import * as validator from "../validator/transport";

export const onIdChanged = asAction(
    actions.ADD_TRANSPORT_DIALOG_ID_CHANGED,
    PropTypes.string.isRequired
);

export const onNameChanged = asAction(
    actions.ADD_TRANSPORT_DIALOG_NAME_CHANGED,
    PropTypes.string.isRequired
);

export const onTypeChanged = asAction(
    actions.ADD_TRANSPORT_DIALOG_TYPE_CHANGED,
    validator.TransportType.isRequired
);

export const onProtocolChanged = asAction(
    actions.ADD_TRANSPORT_DIALOG_PROTOCOL_CHANGED,
    PropTypes.string.isRequired
);

export const onVersionChanged = asAction(
    actions.ADD_TRANSPORT_DIALOG_VERSION_CHANGED,
    PropTypes.string.isRequired
);

export const onEndpointTypeChanged = asAction(
    actions.ADD_TRANSPORT_DIALOG_ENDPOINT_TYPE_CHANGED,
    PropTypes.oneOf(['uris', 'addresses']).isRequired
);

export const onAddEndpointUri = asAction(
    actions.ADD_TRANSPORT_DIALOG_ENDPOINT_ADD_URI
);

export const onEndpointUriChanged = asAction(
    actions.ADD_TRANSPORT_DIALOG_ENDPOINT_URI_CHANGED,
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        uri: PropTypes.string.isRequired,
    }).isRequired
);
