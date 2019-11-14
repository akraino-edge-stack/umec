import PropTypes from "prop-types";

export const TransportType = PropTypes.oneOf([
    'REST_HTTP',
    'MB_TOPIC_BASED',
    'MB_ROUTING',
    'MB_PUBSUB',
    'RPC',
    'RPC_STREAMING',
    'WEBSOCKET',
]);

export const EndpointAddress = PropTypes.shape({
    host: PropTypes.string.isRequired,
    port: PropTypes.number.isRequired,
});

export const EndpointInfo = PropTypes.oneOfType([
    PropTypes.shape({
        uris: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    PropTypes.shape({
        addresses: PropTypes.arrayOf(EndpointAddress).isRequired,
    }),
    PropTypes.shape({
        alternative: PropTypes.any.isRequired,
    }),
]);

export const Oauth2GrantType = PropTypes.oneOf([
    'OAUTH2_AUTHORIZATION_CODE',
    'OAUTH2_IMPLICIT_GRANT',
    'OAUTH2_RESOURCE_OWNER',
    'OAUTH2_CLIENT_CREDENTIALS',
]);

export const SecurityInfo = PropTypes.oneOfType([
    PropTypes.shape({
        grantTypes: PropTypes.arrayOf(Oauth2GrantType).isRequired,
        tokenEndpoint: PropTypes.string.isRequired,
    }),
]);

export const TransportInfo = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: TransportType.isRequired,
    protocol: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    endpoint: EndpointInfo.isRequired,
    security: SecurityInfo.isRequired,
});
