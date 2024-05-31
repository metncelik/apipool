import axios from "axios";

export const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_X_SERVICE_URL + '/auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_X_SERVICE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});