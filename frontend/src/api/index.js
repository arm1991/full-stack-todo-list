import axios from "axios";

export const SERVER_URL = "http://localhost:8000";
export const UPLOAD_HEADER = {
    headers: { "Content-Type": "multipart/form-data" },
};

const $api = axios.create({
    baseURL: SERVER_URL,
    // withCredentials: true,
});

export const $GET = async (route) => {
    try {
        return await $api.get(route);
    } catch (err) {
        throw new Error(err.message);
    }
};

export const $DELETE = async (route, sendData) => {
    try {
        return await $api.delete(route, { data: sendData });
    } catch (err) {
        throw new Error(err.message);
    }
};

export const $POST = async (route, sendData, headers) => {
    try {
        return await $api.post(route, sendData, headers || {});
    } catch (err) {
        throw new Error(err.message);
    }
};

export const $PUT = async (route, sendData, headers) => {
    try {
        return await $api.put(route, sendData, headers || {});
    } catch (err) {
        throw new Error(err.message);
    }
};
