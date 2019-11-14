import PropTypes from "prop-types";

import { TransportInfo } from "./transport";

export const ServiceState = PropTypes.oneOf([
    'ACTIVE',
    'INACTIVE'
]);

export const Serializer = PropTypes.oneOf([
    'JSON',
    'XML',
    'PROTOBUF'
]);

export const Service = PropTypes.shape({
    serName: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    state: ServiceState.isRequired,
    serializer: Serializer.isRequired,
    transportInfo: TransportInfo,
});
