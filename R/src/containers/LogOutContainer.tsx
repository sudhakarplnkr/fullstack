import * as React from 'react';
import { Redirect } from 'react-router';

interface ILogOutProps {
    onLogOut(): void;
}

class LogOutContainer extends React.Component<ILogOutProps, {}> {
    public constructor(props: ILogOutProps) {
        super(props);
        this.handleOnLogOut();
    }

    private handleOnLogOut = (): void => {
        sessionStorage.removeItem('AssociateId');
        this.props.onLogOut();
    };

    public render() {
        return (<Redirect to="/login" />);
    }
}

export default LogOutContainer;