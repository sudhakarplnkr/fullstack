import service from '../services/Service';
import { Dashboard } from '../typings/ApiClient';

export const DASHBOARD_FAILED_RESPONCE = 'dashboard/UPDATE_DASHBOARD';
export const UPDATE_DASHBOARD = 'dashboard/UPDATE_DASHBOARD';
export const LOAD_DASHBOARD = 'dashboard/LOAD_DASHBOARD';

export type Action = {
    type: string,
    payload: Dashboard[]
};

export const loadDashboard = () => {
    return (dispatch: any) => {
        service.DashboardClient.get()
            .then((response: Dashboard[]) => {
                dispatch({
                    type: UPDATE_DASHBOARD,
                    payload: response
                });
            }).catch(() => {
                dispatch({
                    type: DASHBOARD_FAILED_RESPONCE
                });
            });
    };
};
