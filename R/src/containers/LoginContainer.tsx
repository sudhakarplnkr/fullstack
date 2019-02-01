import * as React from 'react';
import LoginComponent from '../components/LoginComponent';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onLogin, onAssociateIdChange } from '../actions/LoginActions';

export interface ILoginState {
    associateId?: number;
    isAuthenticated: boolean;
}

interface ILoginProps {
    associateId?: number;
    onLogin(associateId?: number): void;
    onAuthenticated(): void;
    onAssociateIdChange(associateId?: number): void;
    isAuthenticated: boolean;
}

class LoginContainer extends React.Component<ILoginProps, ILoginState> {
    public constructor(props: ILoginProps) {
        super(props);
    }

    private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (Number(event.target.value)) {
            this.props.onAssociateIdChange(parseInt(event.target.value, 0));
        }
    };

    private handleOnLogin = (): void => {
        this.props.onLogin(this.props.associateId);
        this.props.onAuthenticated();
    };

    public render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to="/" />);
        }
        return (<LoginComponent associateId={this.props.associateId} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(event)} onLogin={() => this.handleOnLogin()} />);
    }
}

const mapStateToProps = (login: any) => {
    return {
        associateId: login.LoginReducer.associateId,
        isAuthenticated: sessionStorage.getItem('AssociateId') ? true : false
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            onLogin,
            onAssociateIdChange
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
