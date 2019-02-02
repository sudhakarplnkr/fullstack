import * as Api from '../typings/ApiClient';
import { FileManagementClient } from '../typings/FileManagementService';
import { Request } from '../utils/RequestExtension';
import { RoleServiceClient } from './RoleServiceClient';

class Service<T> {
    public constructor(private service: new (baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) => T) {
    }

    public new(): T {
        return new this.service(Request.baseUrl, Request.http);
    }
}

export default {
    DashboardClient: new Service(Api.DashboardClient).new(),
    AssociatePlanClient: new Service(Api.AssociatePlanClient).new(),
    AssociateDetailsClient: new Service(Api.AssociateDetailsClient).new(),
    AssociateClient: new Service(Api.AssociateClient).new(),
    ProjectClient: new Service(Api.ProjectClient).new(),
    ProjectGroupClient: new Service(Api.ProjectGroupClient).new(),
    ProjectGroupPlanClient: new Service(Api.ProjectGroupPlanClient).new(),
    FileManagementClient: new Service(FileManagementClient).new(),
    KnowledgeTransferClient: new Service(Api.KnowledgeTransferClient).new(),
    ModeClient: new Service(Api.ModeClient).new(),
    RoleClient: new Service(Api.RoleClient).new(),
    AccountRoleClient: new Service(Api.AccountRoleClient).new(),
    ProjectTeamClient: new Service(Api.ProjectTeamClient).new(),
    UserRoleClient: new Service(Api.UserRoleClient).new(),
    RoleServiceClient: new RoleServiceClient()
};
