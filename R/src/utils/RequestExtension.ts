import * as $ from 'jquery';
import { BASE_URL } from './Environment';
import SessionManagement from './SessionManagement';

const http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> } = {
    fetch: (url: RequestInfo, init?: RequestInit): Promise<Response> => {
        const headers = init ? init.headers : {};
        const token = SessionManagement.GetToken();
        if (token) {
            $.extend(headers, { 'Authorization': `Bearer ${token.AssociateId}` });
        }
        return fetch(url, init);
    }
};

const baseUrl: string = BASE_URL;

export const Request: { baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> } } = { baseUrl: baseUrl, http: http };