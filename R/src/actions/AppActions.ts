import SessionManagement from '../utils/SessionManagement';

export const APP_ONAUTHENTICATED = 'app/APP_ONAUTHENTICATED';
export const AP_ONLOGOUT = 'app/AP_ONLOGOUT';

export const onLogout = () => {
    SessionManagement.RemoveToken();
    return (dispatch: any) => {
        dispatch({
            type: AP_ONLOGOUT            
        });     
    };
};
