import { UserRole } from '../typings/ApiClient';
import { BASE_URL } from '../utils/Environment';

export class RoleServiceClient {

    public get(associateId?: number): Promise<UserRole[] | null> {
        const http = {
            fetch: (apiUrl: RequestInfo, init?: RequestInit): Promise<Response> => {
                const headers = init ? init.headers : {};
                Object.assign(headers, { 'Authorization': `Bearer ${btoa(`${associateId}:`)}` });
                return fetch(apiUrl, init);
            }
        };
        let url = BASE_URL + '/api/UserRole';
        url = url.replace(/[?&]$/, '');

        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        return http.fetch(url, options).then((_response: Response) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: Response): Promise<UserRole[] | null> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); }
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === '' ? null : JSON.parse(_responseText, undefined);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [];
                    for (let item of resultData200) {
                        result200.push(UserRole.fromJS(item));
                    }
                }
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                throw _responseText;
            });
        }
        return Promise.resolve<UserRole[] | null>(null);
    }
}