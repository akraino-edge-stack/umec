#![feature(proc_macro_hygiene, decl_macro)]

// use std::collections::HashMap;
use std::process::Command;
use serde::{Serialize, Deserialize};

#[macro_use] extern crate structopt;
use structopt::StructOpt;

#[macro_use] extern crate rocket;
use rocket::config::{Config, Environment};
use rocket::response::NamedFile;

extern crate rocket_contrib;
use rocket_contrib::serve::StaticFiles;
use rocket_contrib::templates::Template;

#[get("/index.html")]
fn index() -> NamedFile {
    NamedFile::open("./templates/index.html").unwrap()
}

#[get("/config.html")]
fn config() -> Template {
    #[derive(Serialize, Deserialize, Debug)]
    struct UmecContext {
        os_release: Vec<String>,
        podman_info: Vec<String>,
    };
    let output = Command::new("cat")
                             .arg("/etc/os-release")
                             .output()
                             .expect("Could not show os-release");
    let output_string = String::from_utf8(output.stdout).unwrap();
    let mut os_release: Vec<String>  = Vec::new();
    for i in output_string.lines() {
        os_release.push(i.to_string());
    };

    let output2 = Command::new("podman info").output();
    let mut podman_info: Vec<String> = Vec::new();
    match output2 {
        Ok(s)  => podman_info.push(format!("{:?}", s.stdout)),
        Err(_) => podman_info.push("Podman info failed".to_string()),
    };

    let context = UmecContext {
        os_release,
        podman_info,
    };
    Template::render("config", &context)
}

#[derive(StructOpt, Debug)]
#[structopt(name="umec_status_server")]
struct Opt {
    #[structopt(name = "PORT", default_value="8000")]
    port: u16,
}


fn main() {
    let opt = Opt::from_args();
    let config = Config::build(Environment::Staging)
        .port(opt.port)
        .finalize()
        .expect("Cannot set port for web server");
    rocket::custom(config).mount("/css", StaticFiles::from("./static/css"))
                          .mount("/images", StaticFiles::from("./static/images"))
                          .mount("/", routes![config,index])
                          .attach(Template::fairing())
                          .launch();
}
