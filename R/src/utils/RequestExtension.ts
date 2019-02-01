import { BASE_URL } from './Environment';
import * as $ from 'jquery';

const authHeaders = { 'Authorization':  sessionStorage.getItem('AssociateId')};
const http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> } = {
    fetch: (url: RequestInfo, init?: RequestInit): Promise<Response> => {
        const headers = init ? init.headers : {};
        $.extend(headers, authHeaders);
        return fetch(url, init);
    }
};

const baseUrl: string = BASE_URL;

export const Request: { baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> } } = { baseUrl: baseUrl, http: http };