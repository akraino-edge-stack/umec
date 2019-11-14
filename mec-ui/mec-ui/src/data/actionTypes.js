import _ from "lodash";
import PropTypes from "prop-types";

const mirror = (obj) => _.mapValues(obj, (val, key) => key);

export default mirror({
    HOST_INPUT_CHANGED: "",
    SET_HOST: "",

    OPEN_WIZARD: "",
    CLOSE_WIZARD: "",

    SERVICE_LIST_REQUEST_START: "",
    SERVICE_LIST_REQUEST_DONE: "",
    SERVICE_LIST_REQUEST_FAILED: "",

    SERVICE_LIST_EXPAND_DETAILS: "",
    SERVICE_LIST_CLOSE_DETAILS: "",

    ADD_SERVICE_REQUEST_START: "",
    ADD_SERVICE_REQUEST_DONE: "",
    ADD_SERVICE_REQUEST_FAILED: "",

    ADD_SERVICE_DIALOG_NAME_CHANGED: "",
    ADD_SERVICE_DIALOG_VERSION_CHANGED: "",
    ADD_SERVICE_DIALOG_STATE_CHANGED: "",
    ADD_SERVICE_DIALOG_SERIALIZER_CHANGED: "",
    ADD_SERVICE_DIALOG_TRANSPORT_CHANGED: "",

    ADD_TRANSPORT: "",

    ADD_TRANSPORT_DIALOG_ID_CHANGED: "",
    ADD_TRANSPORT_DIALOG_NAME_CHANGED: "",
    ADD_TRANSPORT_DIALOG_TYPE_CHANGED: "",
    ADD_TRANSPORT_DIALOG_PROTOCOL_CHANGED: "",
    ADD_TRANSPORT_DIALOG_VERSION_CHANGED: "",

    ADD_TRANSPORT_DIALOG_ENDPOINT_TYPE_CHANGED: "",
    ADD_TRANSPORT_DIALOG_ENDPOINT_ADD_URI: "",
    ADD_TRANSPORT_DIALOG_ENDPOINT_URI_CHANGED: "",

    WIZARD_SET_ACTIVE_STEP: "",
});

export function asAction(action, propTypes) {
    return (data) => {
        let obj = {
            type: action,
        };

        if (data !== undefined) {
            obj.data = data;
        }

        if (propTypes !== undefined) {
            PropTypes.checkPropTypes({ data: propTypes }, obj, 'data', action);
        }

        return obj;
    };
}
