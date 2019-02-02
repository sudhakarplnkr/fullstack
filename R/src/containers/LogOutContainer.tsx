import * as React from 'react';
import { Redirect } from 'react-router';
import { ILogoutProps } from '../models/Logout';
import SessionManagement from '../utils/SessionManagement';

class LogoutContainer extends React.Component<ILogoutProps, {}> {
    public constructor(props: ILogoutProps) {
        super(props);
        this.handleOnLogout();
    }

    private handleOnLogout = (): void => {
        SessionManagement.RemoveToken();
        this.props.onLogout();
    };

    public render() {
        return (<Redirect to="/login" />);
    }
}

export default LogoutContainer;