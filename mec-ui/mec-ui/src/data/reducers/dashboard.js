import _ from "lodash";

import actions from "../actionTypes";

const INITIAL_STATE = {
    hostInput: "",
    host: "",
};

function dashboardReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actions.HOST_INPUT_CHANGED:
            return {
                ...state,
                hostInput: action.data,
            };

        case action.SET_HOST:
            return {
                ...state,
                host: action.data,
            };

        default:
            return state;
    }
}

export default dashboardReducer;
