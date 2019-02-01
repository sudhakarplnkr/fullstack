import * as Api from '../ApiClient';
import { Request } from '../utils/RequestExtension';

class Service<T> {
    public constructor(private service: new (baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) => T) {
    }

    public new(): T {
        return new this.service(Request.baseUrl, Request.http);
    }
}

export default {
    DashboardClient: new Service(Api.DashboardClient).new(),
    AssociatePlanClient: new Service(Api.AssociatePlanClient).new()
};
