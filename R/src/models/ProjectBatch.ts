import { GroupPlan } from '../models/ProjectBatch';
import { Associate, AssociatePlan, AssociateProjectGroup, CreateProjectGroupPlan, KnowledgeTransfer, Mode, ProcessCreateProjectGroup, ProcessUpdateProjectGroup, Project, ProjectGroup, ProjectGroupPlanWithStatus, Role, UpdateProjectGroupPlan } from '../typings/ApiClient';

export interface IProjectProps {
    loadProjects(): void;
    loadBatches(projectId: string): void;
    loadProjectGroupPlan(batchId: string): void;
    showModal(show: Boolean): void;
    loadAddPlan(addPlan: Boolean, projectGroupPlan?: ProjectGroupPlanWithStatus): void;
    loadAssociateStatus(groupPlan: Boolean, groupPlanId: string): void;
    updateProjectBatch: (projectBatchModel: IProjectBatchModel) => void;
    createBatch: (processCreateProjectGroup: ProcessCreateProjectGroup) => void;
    saveBatch: (id: string, processUpdateProjectGroup: ProcessUpdateProjectGroup) => void;
    deleteBatch: (id?: string) => void;
    deletePlan: (batchId?: string, id?: string) => void;
    projectBatchModel: IProjectBatchModel;
    loadAddBatch: (addBatch: Boolean, projectId: string, projectGroupId?: string) => void;
    updateAddPlan: (updatePlan: GroupPlan) => void;
    updatePlan: (batchId: string, updatePlan: UpdateProjectGroupPlan) => void;
    addPlanSave: (batchId: string, createPlan: CreateProjectGroupPlan) => void;
    formHandler: () => void;
}
export interface IProjectState {
    projectBatchModel: IProjectBatchModel;
}

export interface IProjectBatchModel {
    projectGroupPlan?: ProjectGroupPlanWithStatus[];
    project?: Project[];
    batch?: ProjectGroup[];
    showDialog?: Boolean;
    showAddPlan?: Boolean;
    showAddBatch?: Boolean;
    showStatus?: Boolean;
    associate?: Associate[];
    knowledgeTransfer?: KnowledgeTransfer[];
    mode?: Mode[];
    role?: Role[];
    associateProjectGroup?: AssociateProjectGroup[];
    associatePlan?: AssociatePlan[];
    selectedProjectBatch?: string[];    
    selectedProject?: Project;
    selectedBatch?: ProcessProjectGroup;
    processProjectGroup?: ProcessProjectGroup;    
    groupPlan?: GroupPlan;
    projectPlan?: ProjectGrouppPlanModel;
    deletedPlanId?: string;
    selectedSearchText?: string;
    nonSelectedSearchText?: string;
}

export interface GroupPlan {
    week?: number;
    day?: number;
    knowledgeTransferId?: string;
    reference?: string | undefined;
    modeId?: string;
    roleId?: string;
    ownerId?: string | undefined;
    scheduledDate?: Date;
    duration?: string;
    projectGroupId?: string;
}

export interface ProcessProjectGroup {
    id?: string;
    projectId?: string;
    name?: string | undefined;
    startDate?: Date;
    addAssociates?: Associate[] | undefined;
    projectGroupId?: string;
    deleteAssociates?: Associate[] | undefined;
    active?: boolean;
}
export interface ProjectGrouppPlanModel {
    id?: string;
    week?: number;
    day?: number;
    knowledgeTransferId?: string;
    knowledgeTransferName?: string | undefined;
    reference?: string | undefined;
    duration?: number;
    modeId?: string;
    modeName?: string | undefined;
    roleId?: string;
    roleName?: string | undefined;
    ownerId?: string | undefined;
    ownerName?: string | undefined;
    scheduledDate?: Date;
    projectGroupId?: string;
    totalCount?: number;
    completedCount?: number;
}