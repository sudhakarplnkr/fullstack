import { UPDATE_DASHBOARD, DASHBOARD_FAILED_RESPONCE, Action } from '../actions/DashboardActions';
import { IDashboardState } from '../containers/DashboardContainer';

const initialState: IDashboardState = {
    dashboard: [],
    message: ''
};

const DashboardReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case UPDATE_DASHBOARD:
            return {
                ...state,
                dashboard: action.payload
            };
        case DASHBOARD_FAILED_RESPONCE:
            return {
                ...state,
                dashboard: action.payload
            };
        default:
            return state;
    }
};

export default DashboardReducer;
