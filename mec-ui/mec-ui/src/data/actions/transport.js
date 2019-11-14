import actions from "../actionTypes";
import { asAction } from "../actionTypes";
import * as validator from "../validator/transport";

export const addTransport = asAction(
    actions.ADD_TRANSPORT,
    validator.TransportInfo.isRequired
);
