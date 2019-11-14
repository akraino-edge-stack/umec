import actions from "../actionTypes";

const INITIAL_STATE = {
    serName: "",
    version: "",
    state: "ACTIVE",
    serializer: "JSON",
    transport: null,
};

function addServiceDialogReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actions.ADD_SERVICE_DIALOG_NAME_CHANGED:
            return {
                ...state,
                serName: action.data,
            };

        case actions.ADD_SERVICE_DIALOG_VERSION_CHANGED:
            return {
                ...state,
                version: action.data,
            };

        case actions.ADD_SERVICE_DIALOG_STATE_CHANGED:
            return {
                ...state,
                state: action.data,
            };

        case actions.ADD_SERVICE_DIALOG_SERIALIZER_CHANGED:
            return {
                ...state,
                serializer: action.data,
            };

        case actions.ADD_SERVICE_DIALOG_TRANSPORT_CHANGED:
            return {
                ...state,
                transport: action.data,
            };


        default:
            return state;
    }
}

export default addServiceDialogReducer;
