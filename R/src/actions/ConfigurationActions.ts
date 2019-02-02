import { toastr } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { MessageConstants } from '../constants/MessageConstants';
import { AssociateModel } from '../models/Associate';
import service from '../services/Service';
import { AccountRole, AssociateDetails, PageRequest, Project, ResponseOfIListOfAssociateDetails, Role, Team } from '../typings/ApiClient';

export const UPDATE_ASSOCIATE_MODEL = 'associate/UPDATE_ASSOCIATE_MODEL';

export type Action = {
    type: string,
    payload: AssociateDetails[]
};

export const initialPageRequest = () => {
    const orderParam: { [key: string]: boolean; } = {};
    orderParam['AssociateName'] = false;
    const pageInit = {
        pageNumber: 1,
        perPageCount: 10,
        sortColumns: orderParam
    } as PageRequest;

    return pageInit;
};

export const buildAssociateSearchParam = (searchText?: string, searchParams?: { [key: string]: string; }) => {
    if (!searchParams) {
        searchParams = {};
    }
    searchParams['AssociateName'] = searchText ? searchText : '';

    return searchParams;
};

export const resetPageModel = () => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_ASSOCIATE_MODEL,
            payload: { PageRequest: { ...initialPageRequest() } }
        });
    };
};

export const loadAssociate = (pageRequest?: PageRequest) => {
    return (dispatch: any) => {
        if (!pageRequest) {
            dispatch({
                type: UPDATE_ASSOCIATE_MODEL,
                payload: { PageRequest: { ...initialPageRequest() } }
            });
        }
        service.AssociateDetailsClient.get(pageRequest ? pageRequest : initialPageRequest())
            .then((response: ResponseOfIListOfAssociateDetails) => {
                dispatch({
                    type: UPDATE_ASSOCIATE_MODEL,
                    payload: { Associate: response }
                });
            });
    };
};

export const loadAddAssociate = () => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_ASSOCIATE_MODEL,
            payload: { IsAddEdit: true }
        });
        service.RoleClient.get()
            .then((response: Role[]) => {
                dispatch({
                    type: UPDATE_ASSOCIATE_MODEL,
                    payload: { Role: response }
                });
            });
        service.ProjectClient.get()
            .then((response: Project[]) => {
                dispatch({
                    type: UPDATE_ASSOCIATE_MODEL,
                    payload: { Project: response }
                });
            });
        service.AccountRoleClient.getRole()
            .then((response: AccountRole[]) => {
                dispatch({
                    type: UPDATE_ASSOCIATE_MODEL,
                    payload: { AssociateRole: response }
                });
            });
    };
};

export const loadTeam = (projectId: string) => {
    return (dispatch: any) => {
        service.ProjectTeamClient.getTeamList(projectId)
            .then((response: Team[]) => {
                dispatch({
                    type: UPDATE_ASSOCIATE_MODEL,
                    payload: { Team: response }
                });
            });
    };
};

export const addAssociateDetail = (associateDetails: AssociateDetails) => {
    return (dispatch: any) => {
        if ((associateDetails.associateId) === undefined) {
            service.AssociateDetailsClient.post(associateDetails)
                .then(() => {
                    dispatch({
                        type: UPDATE_ASSOCIATE_MODEL,
                        payload: { IsAddEdit: false }
                    });
                    toastr.success(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.SAVE_SUCCESS_MESSAGE);
                    bindActionCreators({ loadAssociate }, dispatch).loadAssociate();
                }).catch(() => {
                    toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.SAVE_ERROR_MESSAGE);
                });
        } else {
            service.AssociateDetailsClient.put(associateDetails)
                .then(() => {
                    dispatch({
                        type: UPDATE_ASSOCIATE_MODEL,
                        payload: { IsAddEdit: false }
                    });
                    toastr.success(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.SAVE_SUCCESS_MESSAGE);
                    bindActionCreators({ loadAssociate }, dispatch).loadAssociate();
                }).catch(() => {
                    toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.SAVE_ERROR_MESSAGE);
                });
        }
    };
};

export const updateAssociateModel = (associateModel: AssociateModel) => {
    return (dispatch: any) => {
        dispatch({
            type: UPDATE_ASSOCIATE_MODEL,
            payload: associateModel
        });
    };
};

export const deleteAssociate = (id: string) => {
    return (dispatch: any) => {
        service.AssociateDetailsClient.delate(id)
            .then(() => {
                bindActionCreators({ loadAssociate }, dispatch).loadAssociate();
                toastr.success(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.DELETE_SUCCESS_MESSAGE);
            }).catch(() => {
                toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.DELETE_ERROR_MESSAGE);
            });
    };
};
