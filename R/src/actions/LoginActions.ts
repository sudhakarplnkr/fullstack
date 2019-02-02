import SessionManagement from '../utils/SessionManagement';

export const ON_LOGIN = 'login/ON_LOGIN';
export const CHANGE_ASSOCIATE_ID = 'login/CHANGE_ASSOCIATE_ID';

export const onLogin = (associateId?: number) => {
    return (dispatch: any) => {
        SessionManagement.SetToken({ AssociateId: btoa(`${associateId}:`), isAdmin: true });
        dispatch({
            type: ON_LOGIN,
            payload: { associateId: associateId, isAdmin: true }
        });
    };
};

export const onAssociateIdChange = (associateId?: number) => {
    return (dispatch: any) => {
        dispatch({
            type: CHANGE_ASSOCIATE_ID,
            payload: associateId
        });
    };
};
