import { APP_ONAUTHENTICATED, AP_ONLOGOUT } from '../actions/AppActions';
import { IAppState } from '../models/App';

const initialState: IAppState = {
    isAuthenticated: false
};

const AppReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case APP_ONAUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true
            };
        case AP_ONLOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                isAdmin: false
            };
        default:
            return state;
    }
};

export default AppReducer;
