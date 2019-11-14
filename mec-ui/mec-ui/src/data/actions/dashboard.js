import PropTypes from "prop-types";

import actions from "../actionTypes";
import { asAction } from "../actionTypes";

export const hostInputChanged = asAction(
    actions.HOST_INPUT_CHANGED,
    PropTypes.string
);

export const setHost = asAction(
    actions.SET_HOST,
    PropTypes.string
);
