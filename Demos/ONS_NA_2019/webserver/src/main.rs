#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
//  #[macro_use] extern crate serde_derive;
extern crate serde_derive;
extern crate influx_db_client;
extern crate json;
extern crate serde_json;
extern crate rocket_contrib;

use std::collections::HashMap;
// use std::path::{Path, PathBuf};
use serde::{Serialize, Deserialize};

use rocket::Request;
// use rocket::response::NamedFile;
// use rocket::response::Redirect;
use rocket_contrib::templates::Template;
use rocket_contrib::serve::StaticFiles;

#[get("/")]
fn list_dbs() -> Template {
    let mut context = HashMap::new();
    let res = query_db("SHOW DATABASES","");
    let mut dbs: Vec<String> = vec!["".to_string()];
    match res {
        Some(res) => {
                        for i in &res.values {
                            let j = i[0].as_str().unwrap().to_string();
                            dbs.push(j);
                        }
                     },
        None => (), 
    }
    context.insert("dbs", dbs);
    Template::render("index", &context)
}

#[get("/influx/<db_name>")]
fn show_measurements(db_name: String) -> Template {
    let s = query_db("SHOW MEASUREMENTS", db_name.as_str());
    let mut measurements = Vec::new();
    match s {
        Some(s) => {
                        for i in &s.values {
                            measurements.push(trim_end_quotes(i[0].to_string()));
                        }
                    },
        None => (),
    }

    #[derive(Serialize, Deserialize, Debug)]
    struct MeasurementContext {
        db: String,
        measurements: Vec<String>,
    }
    let context = MeasurementContext { 
        db: db_name,
        measurements: measurements,
    };
    Template::render("measurements", context)
}

#[get("/influx/<db_name>/<measurement>")]
fn show_data(db_name: String, measurement: String) -> Template {
    let s = query_db(format!("SELECT * FROM \"{}\"",measurement).as_str() , db_name.as_str());
    let columns: Vec<String> = 
        match &s {
            Some(s) => s.columns.clone(),
            None    => vec!["".to_string()],
        };
    let mut values: Vec<Vec<String>> = vec![vec![]];
    match s {
        Some(s) => {
                        for i in &s.values {
                            let mut row: Vec<String> = vec![];;
                            for j in i.into_iter() {
                                row.push(trim_end_quotes(j.to_string()));
                            }
                            values.push(row);
                        }
                    }
        None => ()
    };
    #[derive(Serialize, Deserialize, Debug)]
    struct DataContext {
        db_name: String,
        measurement: String,
        columns: Vec<String>,
        values: Vec<Vec<String>>,
    };
    let context = DataContext { 
        db_name,
        measurement,
        columns,
        values,
    };
    Template::render("data", context)
}

#[get("/influx/<db_name>/<measurement>/<timelimit>")]
fn show_data_timelimit(db_name: String, measurement: String, timelimit: String) -> Template {
    let s = query_db(format!("SELECT * FROM \"{}\" WHERE TIME > now() - {}", measurement, timelimit).as_str() , db_name.as_str());
    let columns: Vec<String> = 
        match &s {
            Some(t) => t.columns.clone(),
            None => vec!["".to_string()],
        };
    let mut values: Vec<Vec<String>> = vec![];
    match s {
        Some(s) => 
        {
            for i in &s.values {
                let mut row: Vec<String> = vec![];
                for j in i.into_iter() {
                    row.push(trim_end_quotes(j.to_string()));
                }
                values.push(row);
            }
        },
        None => (),
    };
    #[derive(Serialize, Deserialize, Debug)]
    struct DataContext {
        db_name: String,
        measurement: String,
        timelimit: String,
        columns: Vec<String>,
        values: Vec<Vec<String>>,
    };
    let context = DataContext { 
        db_name,
        measurement,
        timelimit,
        columns,
        values,
    };
    Template::render("data_timelimit", context)
}

fn query_db(query: &str, database: &str) -> Option<influx_db_client::Series> {
    let client: influx_db_client::Client = influx_db_client::Client::new("http://127.0.0.1:8086/", database);
    let q = client.query(query, None).expect("Query failed. Is the InfluxDB running?")
                                     .unwrap()
                                     .pop()
                                     .unwrap();
    // println!("{:?}",q);
    match q.series {
        Some(mut t) => Some(t.pop().unwrap()),
        None    => None,
    }
}


fn trim_end_quotes(s: String) -> String {
    let mut res = s;
    if res.starts_with('"') {
        res.remove(0);
    };
    if res.ends_with('"') {
        res.pop();
    };
    res
}

#[catch(404)]
fn not_found(req: &Request) -> Template {
    let mut map = HashMap::new();
    map.insert("path", req.uri().path());
    Template::render("error/404", &map)
}

fn main() {
    rocket::ignite().mount("/css", StaticFiles::from("./static/css"))
                    .mount("/images", StaticFiles::from("./static/images"))
                    .mount("/", routes![list_dbs, show_measurements, show_data, show_data_timelimit])
                    .attach(Template::fairing())
                    .register(catchers![not_found])
                    .launch();
}

#[test]
fn test_trim() {
    assert_eq!("a", trim_end_quotes("a".to_string()));
    assert_eq!("a", trim_end_quotes(r#""a""#.to_string()));
    assert_eq!("a", trim_end_quotes(r#""a"#.to_string()));
}
