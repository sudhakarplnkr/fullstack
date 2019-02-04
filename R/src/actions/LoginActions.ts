import SessionManagement from '../utils/SessionManagement';
import axios from 'axios';
import { BASE_URL } from '../utils/Environment';
import { toastr } from 'react-redux-toastr';
import { MessageConstants } from '../constants/MessageConstants';

export const ON_LOGIN = 'login/ON_LOGIN';
export const CHANGE_ASSOCIATE_ID = 'login/CHANGE_ASSOCIATE_ID';

export const onLogin = (associateId?: number) => {
    return (dispatch: any) => {
        axios.post(BASE_URL + 'authenticate', {
            username: associateId
        }).then((response: any) => {
            if (!response.data.token) {
                toastr.error(MessageConstants.LOGIN_TITLE_MESSAGE, MessageConstants.LOGIN_FAILED_MESSAGE);
                return;
            }
            SessionManagement.SetToken({ AssociateId: `${associateId}`, isAdmin: true, token: response.data.token });
            dispatch({
                type: ON_LOGIN,
                payload: { associateId: associateId, isAdmin: true }
            });
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
