import { doGet, doPost } from "./rest";

export default {
    listServices: async (host) => {
        return await doGet(host, "services");
    },

    registerService: async (host, service) => {
        return await doPost(host, "services", service);
    },
};
