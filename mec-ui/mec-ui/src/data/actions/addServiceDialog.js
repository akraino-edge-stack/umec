import PropTypes from "prop-types";

import actions from "../actionTypes";
import servicesProvider from "../../providers/services";
import { asAction } from "../actionTypes";
import * as validator from "../validator/service";

export const serviceNameChanged = asAction(
    actions.ADD_SERVICE_DIALOG_NAME_CHANGED,
    PropTypes.string.isRequired
);

export const serviceVersionChanged = asAction(
    actions.ADD_SERVICE_DIALOG_VERSION_CHANGED,
    PropTypes.string.isRequired
);

export const serviceStateChanged = asAction(
    actions.ADD_SERVICE_DIALOG_STATE_CHANGED,
    validator.ServiceState.isRequired
);

export const serviceSerializerChanged = asAction(
    actions.ADD_SERVICE_DIALOG_SERIALIZER_CHANGED,
    validator.Serializer.isRequired
);

export const serviceTransportChanged = asAction(
    actions.ADD_SERVICE_DIALOG_TRANSPORT_CHANGED,
    PropTypes.string.isRequired
);
