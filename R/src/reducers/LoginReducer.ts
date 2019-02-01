import { ON_LOGIN, ON_LOGOFF, CHANGE_ASSOCIATE_ID } from '../actions/LoginActions';
import { ILoginState } from '../containers/LoginContainer';

const initialState: ILoginState = {
    associateId: undefined,
    isAuthenticated: false
};

const LoginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ON_LOGIN:
            return {
                ...state,
                associateId: action.payload,
                isAuthenticated: true
            };
        case ON_LOGOFF:
            return {
                ...state,
                associateId: undefined,
                isAuthenticated: false
            };
        case CHANGE_ASSOCIATE_ID:
            return {
                ...state,
                associateId: action.payload
            };
        default:
            return state;
    }
};

export default LoginReducer;
