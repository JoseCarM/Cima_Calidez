import axios from 'axios';

const baseUrl = "http://192.168.1.74:8080/"

export const apiCall = (method, url, data, headers) => axios({ method, url: baseUrl + url, data, headers })