pub mod store;
pub mod models;

use std::collections::HashMap;
use models::{
    ApplicationID,
    DnsRuleID,
    DnsRule,
    ServiceID,
    ServiceInfo,
};

pub type DnsMap = HashMap<ApplicationID, HashMap<DnsRuleID, DnsRule>>;
pub type ServiceMap = HashMap<ServiceID, ServiceInfo>;
