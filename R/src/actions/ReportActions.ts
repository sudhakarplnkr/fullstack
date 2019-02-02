import { toastr } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { MessageConstants } from '../constants/MessageConstants';
import { GroupPlan, IProjectBatchModel } from '../models/ProjectBatch';
import service from '../services/Service';
import { Associate, AssociatePlan, AssociateProjectGroup, CreateProjectGroupPlan, KnowledgeTransfer, Mode, ProcessCreateProjectGroup, ProcessUpdateProjectGroup, Project, ProjectGroup, ProjectGroupPlanWithStatus, Role, UpdateProjectGroupPlan } from '../typings/ApiClient';
export const UPDATE_PROJECT_BATCH = 'associateStatus/UPDATE_PROJECT_BATCH';

export const loadProjects = () => {
    return (dispatch: any) => {
        service.ProjectClient.get()
            .then((response: Project[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { project: response }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { project: [] }
                });
            });
    };
};

export const loadBatches = (projectId: string, batch?: ProjectGroup) => {
    return (dispatch: any) => {
        service.ProjectGroupClient.query(projectId)
            .then((response: ProjectGroup[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { batch: response, selectedProjectId: projectId, selectedBatch: batch, showAddBatch: false }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { batch: [], selectedProjectId: projectId }
                });
            });
    };
};

export const loadProjectGroupPlan = (batchId: string) => {
    return (dispatch: any) => {
        service.ProjectGroupPlanClient.query(batchId)
            .then((response: ProjectGroupPlanWithStatus[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { projectGroupPlan: response, selectedBatchId: batchId }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { projectGroupPlan: [], selectedBatchId: batchId }
                });
            });
    };
};

export const showModal = (show: Boolean) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROJECT_BATCH,
            payload: { showDialog: show }
        });
    };
};

export const loadAddPlan = (addPlan: Boolean, projectGroupPlan: ProjectGroupPlanWithStatus) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROJECT_BATCH,
            payload: { showAddPlan: addPlan, projectPlan: projectGroupPlan }
        });
        if (!addPlan) {
            return;
        }
        service.AssociateClient.get()
            .then((response: Associate[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { associate: response }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { associate: [] }
                });
            });
        service.KnowledgeTransferClient.get()
            .then((response: KnowledgeTransfer[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { knowledgeTransfer: response }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { knowledgeTransfer: [] }
                });
            });
        service.ModeClient.get()
            .then((response: Mode[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { mode: response }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { mode: [] }
                });
            });
        service.RoleClient.get()
            .then((response: Role[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { role: response }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { role: [] }
                });
            });
    };
};

export const updateProjectBatch = (projectBatchModel: IProjectBatchModel) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROJECT_BATCH,
            payload: projectBatchModel
        });
    };
};

export const loadAddBatch = (addBatch: Boolean, projectId: string, projectGroupId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROJECT_BATCH,
            payload: { showAddBatch: addBatch }
        });
        service.AssociateClient.query(projectId, projectGroupId)
            .then((response: AssociateProjectGroup[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { associateProjectGroup: response, selectedProjectBatch: response.filter(f => f.isGroup).map(u => u.id) }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { associateProjectGroup: [] }
                });
            });
    };
};

export const createBatch = (processCreateProjectGroup: ProcessCreateProjectGroup) => {
    return (dispatch: any) => {
        service.ProjectGroupClient.post(processCreateProjectGroup)
            .then((response: ProjectGroup) => {                
                bindActionCreators({ loadBatches }, dispatch).loadBatches(processCreateProjectGroup.projectId, response);
                bindActionCreators({ loadProjectGroupPlan }, dispatch).loadProjectGroupPlan(response.id);
                toastr.success(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.SAVE_SUCCESS_MESSAGE);
            })
            .catch(() => {
                toastr.error(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.SAVE_ERROR_MESSAGE);
            });
    };
};

export const saveBatch = (id: string, processUpdateProjectGroup: ProcessUpdateProjectGroup) => {
    return (dispatch: any) => {        
        service.ProjectGroupClient.put(id, processUpdateProjectGroup)
            .then(() => {
                bindActionCreators({ loadProjectGroupPlan }, dispatch).loadProjectGroupPlan(id);
                toastr.success(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.SAVE_SUCCESS_MESSAGE);
            })
            .catch(() => {
                toastr.error(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.SAVE_ERROR_MESSAGE);
            });
    };
};

export const deleteBatch = (id: string) => {
    return () => {
        service.ProjectGroupClient.delete(id) 
        .then(() => {        
            toastr.success(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.DELETE_SUCCESS_MESSAGE);
        }).catch(() => {
            toastr.error(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.DELETE_ERROR_MESSAGE);
        });
    };
};

export const loadAssociateStatus = (groupPlan: Boolean, groupPlanId: string) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROJECT_BATCH,
            payload: { showStatus: groupPlan }
        });
        service.AssociatePlanClient.getAssociatePlanStatus(groupPlanId)
            .then((response: AssociatePlan[]) => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { associatePlan: response }
                });
            }).catch(() => {
                dispatch({
                    type: UPDATE_PROJECT_BATCH,
                    payload: { associatePlan: [] }
                });
            });
    };
};
export const updateAddPlan = (projectGroupPlan: GroupPlan) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_PROJECT_BATCH,
            payload: { updatePlan: projectGroupPlan }
        });
    };
};
export const addPlanSave = (batchId: string, plan: CreateProjectGroupPlan) => {
    return (dispatch: any) => {
        service.ProjectGroupPlanClient.post(plan)
            .then(() => {
                bindActionCreators({ loadProjectGroupPlan }, dispatch).loadProjectGroupPlan(batchId);
                toastr.success(MessageConstants.PROJECT_PLAN_TITLE_MESSAGE, MessageConstants.SAVE_SUCCESS_MESSAGE);
            })
            .catch(() => {
                toastr.error(MessageConstants.PROJECT_PLAN_TITLE_MESSAGE, MessageConstants.SAVE_ERROR_MESSAGE);
            });
    };
};

export const updatePlan = (batchId: string, plan: UpdateProjectGroupPlan) => {
    return (dispatch: any) => {
        service.ProjectGroupPlanClient.put(plan.id, plan)
            .then(() => {
                bindActionCreators({ loadProjectGroupPlan }, dispatch).loadProjectGroupPlan(batchId);
                toastr.success(MessageConstants.PROJECT_PLAN_TITLE_MESSAGE, MessageConstants.SAVE_SUCCESS_MESSAGE);
            })
            .catch(() => {
                toastr.error(MessageConstants.PROJECT_PLAN_TITLE_MESSAGE, MessageConstants.SAVE_ERROR_MESSAGE);
            });
    };
};

export const deletePlan = (batchId: string, id: string) => {
    return (dispatch: any) => {
        service.ProjectGroupPlanClient.delete(id)
            .then(() => {
                bindActionCreators({ loadProjectGroupPlan }, dispatch).loadProjectGroupPlan(batchId);
                toastr.success(MessageConstants.PROJECT_PLAN_TITLE_MESSAGE, MessageConstants.DELETE_SUCCESS_MESSAGE);
            }).catch(() => {
                toastr.error(MessageConstants.PROJECT_PLAN_TITLE_MESSAGE, MessageConstants.DELETE_ERROR_MESSAGE);
            });
    };
};