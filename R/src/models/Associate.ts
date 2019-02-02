import { AssociateDetails, Project, AccountRole, Team, PageRequest, ResponseOfIListOfAssociateDetails } from '../typings/ApiClient';
import { Role } from '../typings/ApiClient';

export interface IAssociateProps {
    loadAssociate(PageRequest?: PageRequest): void;
    loadAddAssociate(): void;    
    loadTeam(projectId: string): void;    
    addAssociateDetail: (associateDetails: AssociateDetails) => void;        
    deleteAssociate: (id: string) => void;
    updateAssociateModel: (associateModel?: AssociateModel) => void;
    OnPageChange(pageNumber: number): void;
    OnSearch(searchText: string): void;
    associateModel: AssociateModel;
}

export interface IAssociateState {
    Associate: AssociateDetails[];
    Role: Role[];
    Project: Project[];
    isAddEdit: boolean;
    accountRole: AccountRole[];
    team: Team[];            
    associateModel: AssociateModel;
}

export interface EmployeeDetail {
    associateId?: string;
    designationId?: string | undefined;
    cognizantId?: string | undefined;
    associateName?: string | undefined;
    fNZUserName?: string | undefined;
    fNZStaffId?: string | undefined;
    fNZRoleId?: string | undefined;
    fNZEmail?: string | undefined;
    assetNo?: string | undefined;
    virtualMachineNo?: string | undefined;
    portfolio?: string | undefined;
    fNZDateofJoining?: Date | undefined;
    fNZDateofLeaving?: Date | undefined;
    fNZExperience?: number | undefined;
    billable?: string | undefined;
    location?: string | undefined;
    contactNo?: string | undefined;
    projectId?: string;
    teamId?: string | undefined;
    cognizantRoleId?: string;
    cognizantEmailId?: string | undefined;
    projectName?: string | undefined;
    skillSet?: string | undefined;
    experienceOfAssociate?: number |undefined;
    fse?: boolean | undefined;
    city?: string | undefined;
}

export interface AssociateModel {
    Role?: Role[];
    AccountRole?: AccountRole[];
    Project?: Project[];
    Team?: Team[];
    PageRequest?: PageRequest;
    DeletingAssociateId?: string;        
    Associate?: ResponseOfIListOfAssociateDetails;
    EmployeeDetails?: EmployeeDetail;    
    IsAddEdit?: boolean;        
}