export const ON_LOGIN = 'login/ON_LOGIN';
export const ON_LOGOFF = 'login/ON_LOGOFF';
export const CHANGE_ASSOCIATE_ID = 'login/CHANGE_ASSOCIATE_ID';

export const onLogin = (associateId?: number) => {
    sessionStorage.setItem('AssociateId', `${associateId}`);
    return (dispatch: any) => {
        dispatch({
            type: ON_LOGIN,
            payload: associateId
        });
    };
};

export const onLogOff = () => {
    sessionStorage.removeItem('AssociateId');
    return (dispatch: any) => {
        dispatch({
            type: ON_LOGOFF
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
