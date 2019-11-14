import actions from "../actionTypes";

const INITIAL_STATE = {
    serviceList: [],
    serviceListRequestInFlight: false,
};

function servicesReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actions.SERVICE_LIST_REQUEST_START:
            return {
                ...state,
                serviceListRequestInFlight: true,
            };

        case actions.SERVICE_LIST_REQUEST_DONE:
            return {
                ...state,
                serviceList: action.data,
                serviceListRequestInFlight: false,
            };

        case actions.ADD_SERVICE_REQUEST_DONE:
            return {
                ...state,
                serviceList: [
                    ...state.serviceList,
                    action.data,
                ],
            };

        // actions.SERVICE_LIST_REQUEST_FAILED

        case actions.SERVICE_LIST_EXPAND_DETAILS:
            return {
                ...state,
                serviceList: _.map(state.serviceList, (service) => (
                    (service.serInstanceId === action.data) ? (
                        { ...service, open: true }
                    ) : service
                )),
            };

        case actions.SERVICE_LIST_CLOSE_DETAILS:
            return {
                ...state,
                serviceList: _.map(state.serviceList, (service) => (
                    (service.serInstanceId === action.data) ? (
                        { ...service, open: false }
                    ) : service
                )),
            };

        default:
            return state;
    }
}

export default servicesReducer;
