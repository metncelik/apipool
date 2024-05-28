import axios from "axios";

export const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/auth',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});