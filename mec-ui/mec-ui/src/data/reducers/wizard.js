import actions from "../actionTypes";

const INITIAL_STATE = {
    activeStep: "addService",
    isOpen: false,
};

function wizardReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case actions.OPEN_WIZARD:
            return {
                ...state,
                isOpen: true,
            };

        case actions.CLOSE_WIZARD:
            return {
                ...state,
                isOpen: false,
            };

        case actions.WIZARD_SET_ACTIVE_STEP:
            return {
                ...state,
                activeStep: action.data,
            };

        default:
            return state;
    }
}

export default wizardReducer;
