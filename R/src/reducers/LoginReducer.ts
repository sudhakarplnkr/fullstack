import { AP_ONLOGOUT } from '../actions/AppActions';
import { CHANGE_ASSOCIATE_ID, ON_LOGIN } from '../actions/LoginActions';
import { ILoginState } from '../models/Login';

const initialState: ILoginState = {
    associateId: undefined,
    isAuthenticated: false,
    isAdmin: false
};

const LoginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ON_LOGIN:
            return {
                ...state,
                associateId: action.payload.associateId,
                isAdmin: action.payload.isAdmin,
                isAuthenticated: true
            };       
            case AP_ONLOGOUT:
            return {
                ...initialState                
            };    
        case CHANGE_ASSOCIATE_ID:
            return {
                ...initialState,
                associateId: action.payload
            };
        default:
            return state;
    }
};

export default LoginReducer;
