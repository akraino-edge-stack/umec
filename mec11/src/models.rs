#![allow(non_snake_case, non_camel_case_types)]

use std::net::{IpAddr, SocketAddr};
// use std::collections::HashMap;
use serde::{Deserialize, Serialize}; 

#[derive(Debug, Deserialize, Serialize, Clone)]
pub enum IpAddressType {
    IP_V6,
    IP_V4,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub enum State {
    ACTIVE,
    INACTIVE,
}
// 
// DnsRule struct does not have DnsRuleId, since we keep DnsRules in a HashMap
// that is indexed by DnsRuleId.
//
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DnsRule {
    // description:This type represents the general information of a DNS rule.
    
    pub dnsRuleId: String,
    // This is redundant 

    pub domainName: String,
    // example: www.example.com
    // FQDN resolved by the DNS rule

    pub ipAddressType: IpAddressType,
    // example: IP_V6
    // IP address type
    // Can be: IP_V4, IP_V6 

    pub ipAddress: IpAddr,
    // example: 192.0.2.0
    // IP address associated with the FQDN resolved by the DNS rule

    pub ttl: Option<u32>,
    // example: ?
    // Time to live value
    // Assume this is seconds?

    pub state: State,
    // example: ACTIVE
    // DNS rule state
    // Enum:
    // [ ACTIVE, INACTIVE ]
}

pub type ApplicationID = String;
pub type DnsRuleID = String;
pub type ServiceID = String;

#[derive(Deserialize, Serialize, Debug)]
pub struct ProblemDetails {
    pub problem_type : String,
    //A URI reference according to IETF RFC 3986 that identifies the problem type

    pub problem_title : String,
    // A short, human-readable summary of the problem type

    pub problem_status : u32,
    // The HTTP status code for this occurrence of the problem

    pub problem_detail: String,
    // A human-readable explanation specific to this occurrence of the problem

    pub problem_instance : String,
    // A URI reference that identifies the specific occurrence of the problem
}

// This is referred to in MEC-11 documentation, but we provide no way to create
// new CategoryRefs and using them causes an error
#[derive(Deserialize, Serialize, Debug, Clone, PartialEq, Eq)]
pub struct CategoryRef {
    href: String,
    // Reference of the catalogue.
    
    id: String,
    // Unique identifier of the category.
 
    name: String,
    // Name of the category.

    version: String,
    // Category version. 
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TransportInfo {
    pub id: String,
    // The identifier of this transport.

    pub name: String,
    // The name of this transport.

    pub description: Option<String>,
    // Human-readable description of this transport.
    
    pub r#type: TransportTypes,
    // Type of the transport.

    pub protocol: String,
    // The name of the protocol used. Shall be set to "HTTP"
    // for a REST API.

    pub version: String,
    // The version of the protocol used.

    pub endpoint: EndPointInfo,
    // Information about the endpoint to access the transport.

    // security: SecurityInfo,
    // Information about the security used by the transport.
    // NB: Not supported yet

    // implSpecificInfo Not specified 0..1 Additional implementation specific details of the
    // transport. 
    // NB: We leave this out since there is not use for it
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum SerializerTypes {
    JSON,      // Javascript object notation
    XML,       // eXtensible Mark-up Language version 1.1
    PROTOBUF3, // Protocol buffers version 3
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum EndPointInfo {
    uris(Vec<String>),
    // Entry point information of the service as
    // string, formatted according to URI syntax
    // (see IETF RFC 3986). Shall be used
    // for REST APIs.

    addresses(Vec<SocketAddr>),
    // Entry point information of the service as
    // one or more pairs of IP address and port.
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct ServiceInfo {
    pub serInstanceId: Option<String>,
    // Identifier of the service instance assigned by the
    // MEPM/mobile edge platform.
    // Shall be absent in POST requests, and present
    // otherwise.

    pub serName:String,
    // The name of the service. This is how the service
    // producing mobile edge application identifies the service
    // instance it produces.
 
    pub serCategory: Option<CategoryRef>,
    // A Category reference.
    // (The category resource is used to group product
    // offerings, service and resource candidates in logical
    // containers. Categories may contain other categories
    // and/or product offerings, resource or service candidates.)

    pub version: String, 
    // The version of the service.
    
    pub state: State, 
    // Contains the service state: ACTIVE, INACTIVE.

    pub transportId: Option<String>,
    // Identifier of the platform-provided transport to be used by
    // the service. Valid identifiers may be obtained using the
    // "Transport information query" procedure. May be present
    // in POST requests to signal the use of a platform-provided
    // transport for the service, and shall be absent otherwise.

    pub transportInfo: Option<TransportInfo>,
    // Information regarding the transport used by the service.
    // May be present in POST requests to signal the use of an
    // application-provided transport for the service, and shall
    // be present otherwise.

    pub serializer: SerializerTypes, 
    // Indicate the supported serialization format of the service.
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct SecurityInfo {
// The security info refers to OAuth2 which is not yet supported by this implementation
// The security info can be optional in MEC-11, so we leave it empty
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum TransportTypes {
    REST_HTTP, 
    // RESTful API using HTTP (as defined in IETF RFC 7230 and related
    // specifications)

    MB_TOPIC_BASED,
    // Topic-based message bus which routes messages to receivers based on
    // subscriptions, if a pattern passed on subscription matches the topic of the message.
    // Example: MQTT

    MB_ROUTING,
    // Routing-based message bus which routes messages to receivers based on
    // subscriptions, if a key passed on subscription is equal to the key of the message

    MB_PUBSUB,
    // Publish-subscribe based message bus which distributes messages to all subscribers

    RPC,
    // Remote procedure call. Example: GRPC

    RPC_STREAMING,
    // Remote procedure call supporting streams of requests and responses.
    // Example: GRPC

    WEBSOCKET,
    // Websockets as defined in IETF RFC 6455 [12] 
}

#[derive(Debug, Deserialize, PartialEq, Eq, Hash)]
pub enum QueryTypes {
    ser_instance_id,
    ser_name,
    ser_category_id,
}

#[derive(Serialize)]
pub enum TimeSourceStatus {
    TRACEABLE, 
    // time source is locked to the UTC time source
    NONTRACEABLE,
    // time source is not locked to the UTC time source 
}

// We are cheating here since MEC-11 defines seconds and nanoSeconds as u32
#[derive(Serialize)]
pub struct CurrentTime {
    pub seconds: u64, 
    // The seconds part of the Time. 
    // Time is defined as Unixtime since January 1, 1970, 00:00:00 UTC

    pub nanoSeconds: u32,
    // The nanoseconds part of the Time. Time is defined as
    // Unix-time since January 1, 1970, 00:00:00 UTC

    pub timeSourceStatus: TimeSourceStatus,
    // Platform Time Source status
}
