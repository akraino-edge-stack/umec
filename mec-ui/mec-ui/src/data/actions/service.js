import _ from "lodash";
import PropTypes from "prop-types";

import actions from "../actionTypes";
import servicesProvider from "../../providers/services";
import { asAction } from "../actionTypes";
import * as validator from "../validator/service";

export function refreshServiceList(host) {
    return async (dispatch) => {
        dispatch(refreshServiceListStart());

        try {
            var services = await servicesProvider.listServices(host);
            dispatch(refreshServiceListDone(services));
        } catch (err) {
            console.error(err);
            dispatch(refreshServiceListFailed());
        }
    };
}

export const refreshServiceListStart = asAction(
    actions.SERVICE_LIST_REQUEST_START
);

export const refreshServiceListDone = asAction(
    actions.SERVICE_LIST_REQUEST_DONE,
    PropTypes.arrayOf(validator.Service).isRequired
);

export const refreshServiceListFailed = asAction(
    actions.SERVICE_LIST_REQUEST_FAILED,
    PropTypes.string
);

export function addService(host, service) {
    return async (dispatch) => {
        dispatch(addServiceStart());

        try {
            service = await servicesProvider.registerService(host, service);
            dispatch(addServiceDone(service));
            dispatch(closeDialog());
        } catch (err) {
            console.error(err);
            dispatch(addServiceFailed());
        }
    };
}

export const addServiceStart = asAction(
    actions.ADD_SERVICE_REQUEST_START
);

export const addServiceDone = asAction(
    actions.ADD_SERVICE_REQUEST_DONE,
    validator.Service.isRequired
);

export const addServiceFailed = asAction(
    actions.ADD_SERVICE_REQUEST_FAILED,
    PropTypes.string
);

export const expandDetails = asAction(
    actions.SERVICE_LIST_EXPAND_DETAILS,
    PropTypes.string.isRequired
);

export const closeDetails = asAction(
    actions.SERVICE_LIST_CLOSE_DETAILS,
    PropTypes.string.isRequired
);
