#[macro_use]
extern crate actix_web;
extern crate serde_json;
extern crate serde_urlencoded;
// #[macro_use(lazy_static)]
// extern crate lazy_static;



// Std
use std::{env, io};
use std::vec::Vec;
use std::collections::{HashMap, };
use std::sync::RwLock;
use std::time::SystemTime;
use std::path::Path;

use mec11::models::{DnsRule, DnsRuleID, ApplicationID, ProblemDetails,
                    ServiceInfo, ServiceID, QueryTypes, CurrentTime,
                    TimeSourceStatus};

use actix_files as fs;
use actix_web::http::{header, StatusCode};
use actix_web::{
    error, guard, middleware, web, App, HttpRequest, HttpResponse, HttpServer,
    Result,
};

use rand::Rng;
// use serde::{Deserialize, Serialize}; 

const DATASTORE: &'static str = "datastore";
const DNS_STORE: &'static str = "datastore/dns_map.json";
const SERVICE_STORE: &'static str = "datastore/service_map.json";

/// favicon handler
#[get("/favicon")]
fn favicon() -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open("static/favicon.ico")?)
}

/// 404 handler
fn p404() -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open("static/404.html")?.set_status_code(StatusCode::NOT_FOUND))
}


// ETSI MEC-11
//

// #[derive(Deserialize, Serialize)]
// struct Mec11Data {
//    dns_rules : HashMap<ApplicationID, HashMap<DnsRuleID, DnsRule>>,
//     // services: HashMap<ServiceID, ServiceInfo>,
// }

type AllDnsRules = RwLock<mec11::DnsMap>;
type AllServices = RwLock<mec11::ServiceMap>;

fn get_dns_rules(data: web::Data<AllDnsRules>, path: web::Path<(String,)>) -> 
    HttpResponse {
    println!("Get DNS Rules");
    
    let d = &(*data.read().unwrap());
    if d.contains_key(&path.0) {
        HttpResponse::Ok()
            .content_type("application/json")
            .body(serde_json::to_string(&d[&path.0]).unwrap())
    } else {
        let empty_vec : Vec<DnsRule> = vec![];
        HttpResponse::Ok()
            .content_type("application/json")
            .body(serde_json::to_string(&empty_vec).unwrap())
    }
}

fn get_dns_rule_by_id(data: web::Data<AllDnsRules>, path: web::Path<(String, String)>) -> 
    HttpResponse {
    println!("Get DNS Rules");
    
    let d = &(*data.read().unwrap());
    if d.contains_key(&path.0) {
        if d[&path.0].contains_key(&path.1) {
            let response = &d[&path.0][&path.1];
            return HttpResponse::Ok()
                .content_type("application/json")
                .body(serde_json::to_string(&response).unwrap());
        }
    }
    let response = ProblemDetails {
        problem_type : "".to_string(),
        problem_title : "Rule not found".to_string(),
        problem_status : 400,
        problem_detail : format!("Cannot find application {} DNS rule {}", path.0, path.1),
        problem_instance : "".to_string(),
    };
    HttpResponse::BadRequest()
        .content_type("application/problem+json")
        .body(serde_json::to_string(&response).unwrap())
}

fn put_dns_rule(path: web::Path<(String, String,)>, 
                 form_data: web::Bytes,
                 dns_data: web::Data<AllDnsRules>) -> HttpResponse  {
    println!("New DNS put request {:?}", &form_data);
    let mut m = dns_data.write().unwrap();
    let d : DnsRule = match serde_json::from_slice(&form_data.to_vec()) {
        Ok(k) => k,
        Err(_) => { 
            let response = ProblemDetails {
                problem_type : "".to_string(),
                problem_title : "Malformed request".to_string(),
                problem_status : 400,
                problem_detail : format!("Cannot parse request {:?}", form_data),
                problem_instance : "".to_string(),
            };
            return HttpResponse::BadRequest()
                .content_type("application/problem+json")
                .body(serde_json::to_string(&response).unwrap())
        },
    };
    let mut r : HashMap<DnsRuleID, DnsRule> = HashMap::new();
    r.insert(path.1.clone(), d);
    (*m).insert(path.0.clone(), r);
    mec11::store::write_store(DNS_STORE, (*m).clone())
        .unwrap_or_else(|err| {
            eprintln!("Store write failed!: {}", err);
        });
    HttpResponse::Ok()
        .content_type("application/json")
        .body(format!("{:?}",&form_data))
}

fn get_traffic_rules(path: web::Path<(String,)>) -> HttpResponse {
    let pr = ProblemDetails {
        problem_type: "".to_string(),
        problem_title: "Forbidden".to_string(),
        problem_status: 403,
        problem_detail: "Traffic rules are forbidden and not supported".to_string(),
        problem_instance: format!("{:?}", path),
    };
    HttpResponse::Ok()
        .content_type("application/problem+json")
        .body(serde_json::to_string(&pr).unwrap())
}

type ServicesQuery = Vec<(QueryTypes, String)>;

fn get_services(req: web::HttpRequest, service_data: web::Data<AllServices>) -> HttpResponse {
    let rsq = serde_urlencoded::de::from_str::<ServicesQuery>(req.query_string());
    let search_query = match rsq {
        Ok(a) => a,
        Err(e) => {
            let pr = ProblemDetails {
                problem_type: "".to_string(),
                problem_title: "Bad Request".to_string(),
                problem_status: 400,
                problem_detail: format!("Parse error in query\n {:?}", &e).to_string(),
                problem_instance: "".to_string(),
            };
            return HttpResponse::BadRequest()
                .content_type("application/problem+json")
                .body(serde_json::to_string(&pr).unwrap())
        }
    };
    // If sq (Search Query) is empty, we are happy to return an empty list 
    // of results. Otherwise, we will return an error if nothing is found.
    let mut res: Vec<ServiceInfo> = Vec::new();
    let sd = service_data.read().unwrap();
    if search_query.is_empty() {
        for (_, info) in sd.iter() {
            res.push((*info).clone());
        }
    } else {
        for (search_type, search_item) in search_query.iter() {
            for (_, service_info) in sd.iter() {
                match search_type {
                    QueryTypes::ser_instance_id => 
                        if service_info.serInstanceId == Some((*search_item).clone()) {
                                            res.push((*service_info).clone())
                                        },
                    QueryTypes::ser_name => 
                        if service_info.serName == *search_item {
                                            res.push((*service_info).clone())
                                        },       
                    QueryTypes::ser_category_id => {}, // Do nothing with category references
                }
            }
        }
    }
    HttpResponse::Ok() 
        .content_type("application/json")
        .body(serde_json::to_string(&res).unwrap())
}

fn post_service(_req: web::HttpRequest, 
                service_data: web::Data<AllServices>, 
                info: web::Bytes) -> HttpResponse {
    let s: Result<ServiceInfo, serde_json::Error> = serde_json::from_slice(&info.to_vec());
    let mut all_services = service_data.write().unwrap();
    let mut service_info = match s {
        Ok(a) => a,
        Err(e) => {
            let pr = ProblemDetails {
                problem_type: "".to_string(),
                problem_title: "Bad Request".to_string(),
                problem_status: 400,
                problem_detail: format!("Parse error in query\n {:?}", &e).to_string(),
                problem_instance: "".to_string(),
            };
            return HttpResponse::BadRequest()
                .content_type("application/problem+json")
                .body(serde_json::to_string(&pr).unwrap())
        }
    };
    match service_info.clone().serInstanceId {
        Some(a) => {
            if all_services.contains_key(&a) {
               all_services.insert(a.clone(), service_info.clone());
            } else {
                // Trying to insert a new service id
                let pr = ProblemDetails {
                    problem_type: "".to_string(),
                    problem_title: "Bad Request".to_string(),
                    problem_status: 400,
                    problem_detail: 
                        format!("The Service ID {} does not exist", a).to_string(),
                    problem_instance: "".to_string(),
                };
                return HttpResponse::BadRequest()
                    .content_type("application/problem+json")
                    .body(serde_json::to_string(&pr).unwrap())
            }
        },
        None => {
            let mut rng = rand::thread_rng();
            let random_id: String = std::iter::repeat(())
                .map(|()| rng.sample(rand::distributions::Alphanumeric))
                .take(15)
                .collect();
            service_info.serInstanceId = Some(random_id.clone());
            all_services.insert(random_id, service_info.clone());
        }
    }
    mec11::store::write_store(SERVICE_STORE, (*all_services).clone())
        .unwrap_or_else(|err| {
            eprintln!("Store write failed!: {}", err);
        });
    HttpResponse::Ok()
        .content_type("application/json")
        .body(serde_json::to_string(&service_info).unwrap())
}

fn get_current_time() -> HttpResponse {
    let time = std::time::SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap();
    let current_time = CurrentTime {
        seconds: time.as_secs(),
        nanoSeconds: time.subsec_nanos(),
        timeSourceStatus: TimeSourceStatus::TRACEABLE,

    };
    HttpResponse::Ok()
        .content_type("application/json")
        .body(serde_json::to_string(&current_time).unwrap())
}

// fn get_config_save(service_data: web::Data<AllServices>, dns_data: web::Data<AllDnsRules>) 
// -> HttpResponse {
     

// }

fn main() -> io::Result<()> {
    env::set_var("RUST_LOG", "actix_web=debug");
    env_logger::init();
    let sys = actix_rt::System::new("mec11");
    if !Path::new(DATASTORE).is_dir() {
        std::fs::create_dir(DATASTORE)?;
    }
    let e: HashMap<ApplicationID, HashMap<DnsRuleID, DnsRule>> =
        mec11::store::read_store(DNS_STORE)
            .unwrap_or(HashMap::new());
    let s: HashMap<ServiceID, ServiceInfo> =
        mec11::store::read_store(SERVICE_STORE)
            .unwrap_or(HashMap::new());
    let service_data: web::Data<AllServices> = web::Data::new(RwLock::new(s));
    let dns_data: web::Data<AllDnsRules> = web::Data::new(RwLock::new(e));

    HttpServer::new(move || {
        App::new()
            .register_data(dns_data.clone())
            .register_data(service_data.clone())
            // enable logger - always register actix-web Logger middleware last
            .wrap(middleware::Logger::default())
            .wrap(middleware::DefaultHeaders::new()
                .header("Access-Control-Allow-Origin", "*")
            )
            // register favicon
            .service(favicon)
            // DNS rules
            .service(
                web::resource("/mp1/v1/applications/{appInstanceId}/dns_rules")
                    .route(web::get().to(get_dns_rules)),
            )
            .service(
                web::resource("/mp1/v1/applications/{appInstanceId}/dns_rules/{dnsRuleID}")
                    .route(web::get().to(get_dns_rule_by_id))
            )
            // Traffic rules will fail
            .service(
                web::resource("/mp1/v1/applications/{appInstanceId}/traffic_rules")
                    .route(web::get().to(get_traffic_rules)),
            )
            .service(
                web::resource("/mp1/v1/applications/{appInstanceId}/traffic_rules/{traffic_rule_id}")
                    .route(web::get().to(get_traffic_rules)),
            )
            .service(
                web::resource("/mp1/v1/applications/{appInstanceId}/dnsrules/{dnsRuleId}")
                    .route(web::put().to(put_dns_rule)),
            )
            .service(web::resource("/mp1/v1/services")
                    .route(web::get().to(get_services))
                    .route(web::post().to(post_service)))
            .service(web::resource("/mp1/v1/timing/current_time")
                     .route(web::get().to(get_current_time)))
            .service(
                web::resource("/test")
                    .route(web::put().to(|p: web::Bytes| {
                            HttpResponse::Ok()
                                .body(format!("{:?}", p))
                        }))
            )
            .service(web::resource("/error").to(|| {
                error::InternalError::new(
                    io::Error::new(io::ErrorKind::Other, "test"),
                    StatusCode::INTERNAL_SERVER_ERROR,
                )
            }))
            // static files
            .service(fs::Files::new("/static", "static").show_files_listing())
            // redirect
            .service(web::resource("/").route(web::get().to(|req: HttpRequest| {
                println!("{:?}", req);
                HttpResponse::Found()
                    .header(header::LOCATION, "static/welcome.html")
                    .finish()
            })))
            // default
            .default_service(
                // 404 for GET request
                web::resource("")
                    .route(web::get().to(p404))
                    // all requests that are not `GET`
                    .route(
                        web::route()
                            .guard(guard::Not(guard::Get()))
                            .to(HttpResponse::MethodNotAllowed),
                    ),
            )
    })
    .bind("0.0.0.0:8081")?
    .start();

    println!("Starting http server: 0.0.0.0:8081");
    sys.run()
}
