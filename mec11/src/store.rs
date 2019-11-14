use std::fs::File;
use std::io::{Read, Write};

pub fn write_store<T>(path: &'static str, data: T) -> Result<(), std::io::Error>
where
    T: serde::Serialize,
{
    let mut file = File::create(path)?;
    file.write_all(
        serde_json::to_string(&data).unwrap().as_bytes()
    )?;

    Ok(())
}

pub fn read_store<T>(path: &'static str) -> Result<T, std::io::Error>
where
    T: serde::de::DeserializeOwned,
{
    let mut file = File::open(path)?;
    let mut data = String::new();
    file.read_to_string(&mut data)?;

    let data = serde_json::from_slice(&data.as_bytes()).unwrap();

    Ok(data)
}
