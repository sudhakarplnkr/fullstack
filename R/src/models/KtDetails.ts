import { AssociatePlan } from '../typings/ApiClient';
import { FileParameter } from '../typings/FileManagementService';

export interface IKtDetailsProps {
    AssociatePlans?: FileAssociatePlan[];
    AssociatePlan: FileAssociatePlan;
    getAssociatePlans?: () => void;
    onChange: (associatePlanId: string, file: FileList) => void;
    uploadPlan: (associatePlanId: string, fileParameter: FileParameter) => void;
    onFileChange?: (associatePlans: FileAssociatePlan[], associatePlanId: string, file: any) => void;
    updatePlan: (associatePlans: FileAssociatePlan[], id: string, plan: FileAssociatePlan) => void;
    downloadPlan: (file?: string, fileName?: string) => void;
    onCompletionDateChange: (fileAssociatePlan?: FileAssociatePlan, completedDate?: string) => void;
    updatePlanDetail: (fileAssociatePlan?: FileAssociatePlan[]) => void;
    planDetail: (fileAssociatePlan?: FileAssociatePlan) => void;    
}

export interface IKtDetailsState {
    AssociatePlans: FileAssociatePlan[];
}

export interface FileAssociatePlan extends AssociatePlan {
    file: FileParameter;
    fileData?: string;
}