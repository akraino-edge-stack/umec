import actions from "../actionTypes";

const INITIAL_STATE = {
    transportMap: {},
    transportMapRequestInFlight: false,
};

function transportReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actions.ADD_TRANSPORT:
            return {
                ...state,
                transportMap: {
                    ...state.transportMap,
                    [action.data.id]: action.data,
                },
            };

        default:
            return state;
    }
}

export default transportReducer;
