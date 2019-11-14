import actions from "../actionTypes";

const INITIAL_STATE = {
    id: "",
    name: "",
    type: "REST_HTTP",
    protocol: "",
    version: "",
    endpoint: {
        uris: [""],
    },
    security: {
        grantTypes: [],
        tokenEndpoint: "",
    },
};

function addTransportDialogReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actions.ADD_TRANSPORT_DIALOG_ID_CHANGED:
            return {
                ...state,
                id: action.data,
            };

        case actions.ADD_TRANSPORT_DIALOG_NAME_CHANGED:
            return {
                ...state,
                name: action.data,
            };

        case actions.ADD_TRANSPORT_DIALOG_TYPE_CHANGED:
            return {
                ...state,
                type: action.data,
            };

        case actions.ADD_TRANSPORT_DIALOG_PROTOCOL_CHANGED:
            return {
                ...state,
                protocol: action.data,
            };

        case actions.ADD_TRANSPORT_DIALOG_VERSION_CHANGED:
            return {
                ...state,
                version: action.data,
            };

        case actions.ADD_TRANSPORT_DIALOG_ENDPOINT_TYPE_CHANGED:
            return {
                ...state,
                endpoint: mapEndpointType(action.data),
            };

        case actions.ADD_TRANSPORT_DIALOG_ENDPOINT_URI_CHANGED:
            return {
                ...state,
                endpoint: {
                    uris: _.map(state.endpoint.uris, (uri, index) => (
                        (index == action.data.id) ? action.data.uri : uri
                    )),
                },
            };

        case actions.ADD_TRANSPORT_DIALOG_ENDPOINT_ADD_URI:
            return {
                ...state,
                endpoint: {
                    uris: [
                        ...state.endpoint.uris,
                        "",
                    ],
                },
            };

        default:
            return state;
    }
}

function mapEndpointType(type) {
    switch (type) {
        case "uris":
            return {
                uris: [""],
            };

        case "addresses":
            return {
                addresses: [{
                    host: "",
                    port: 80,
                }],
            };

        default:
            return {};
    }
}

export default addTransportDialogReducer;
