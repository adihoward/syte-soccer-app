import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import path from 'path';

export class AxiosInstanceService {
    private instance: AxiosInstance;

    constructor(baseUrl: string) {
        this.instance = axios.create({ baseURL: baseUrl });

        this.instance.interceptors.request.use(this.requestInterceptorSuccess, this.requestInterceptorError);
        this.instance.interceptors.response.use(this.responseInterceptorSuccess, this.responseInterceptorError);
    }

    private requestInterceptorSuccess = (config: AxiosRequestConfig) => {
        console.log(`Fetching new request to ${this.requestToString(config)}`);

        return config;
    }
    private requestInterceptorError = (error: any) => {
        console.log(`Error occured while trying fetching a request: ${error}`)
        return Promise.reject(error)
    };

    private responseInterceptorSuccess = (response: AxiosResponse) => {
        console.log(`Recieved status code of ${response.status} of request ${this.requestToString(response.config)}`)
        return response;
    }

    private responseInterceptorError = (error: any) => {
        // status code out of the range of 2xx
        if (error.response) {
            console.log(`Recieved status code of ${error.response.status} of request ${this.requestToString(error.response.config)}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error occured while setting up the request', error.message);
        }

        return Promise.reject(error);
    }

    private requestToString = (request: AxiosRequestConfig) => {
        const baseUrl = request.baseURL ? request.baseURL : "";
        const url = request.url ? request.url : "";
        return `${request.method?.toUpperCase()} ${path.join(baseUrl, url)}`
    }

    public getAxiosInstance = () => {
        return this.instance;
    }
}


