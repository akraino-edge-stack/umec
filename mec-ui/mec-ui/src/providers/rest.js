import ky from "ky";
import { HTTPError, TimeoutError } from "ky";

const BASE_URL = "/mp1/v1";

export { HTTPError, TimeoutError };

export async function doGet(host, endpoint) {
    return await doRequest(
        host,
        "GET",
        endpoint,
        {}
    );
}

export async function doPost(host, endpoint, data) {
    return await doRequest(
        host,
        "POST",
        endpoint,
        {
            json: data,
        }
    );
}

export async function doPut(host, endpoint, data) {
    return await doRequest(
        host,
        "PUT",
        endpoint,
        {
            json: data,
        }
    );
}

export async function doDelete(host, endpoint) {
    return await doRequest(
        host,
        "DELETE",
        endpoint,
        {}
    );
}

export async function doRequest(host, method, endpoint, settings) {
    let options = {
        prefixUrl: `${host}${BASE_URL}`,
        method,
        ...settings
    };

    return await ky(
        endpoint,
        options
    ).json();
}
