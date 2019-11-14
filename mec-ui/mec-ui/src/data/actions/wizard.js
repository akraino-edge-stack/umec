import PropTypes from "prop-types";

import actions, { asAction } from "../actionTypes";

export const setActiveStep = asAction(
    actions.WIZARD_SET_ACTIVE_STEP,
    PropTypes.oneOf(['addService', 'addTransport']).isRequired
);

export const openWizard = asAction(
    actions.OPEN_WIZARD
);

export const closeWizard = asAction(
    actions.CLOSE_WIZARD
);
