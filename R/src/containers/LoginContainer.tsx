import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { onAssociateIdChange, onLogin } from '../actions/LoginActions';
import LoginComponent from '../components/LoginComponent';
import { ILoginContainerProps, ILoginState } from '../models/Login';

class LoginContainer extends React.Component<ILoginContainerProps, ILoginState> {
    public constructor(props: ILoginContainerProps) {
        super(props);
    }

    private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (Number(event.target.value)) {
            this.props.onAssociateIdChange(parseInt(event.target.value, 0));
        }
    };

    private handleOnLogin = (): void => {
        this.props.onLogin(this.props.associateId);        
    };

    public render() {
        if (this.props.isAuthenticated && this.props.isAdmin) {
            return (<Redirect to="/" />);
        }
        
        if (this.props.isAuthenticated) {
            return (<Redirect to="/kt-detail" />);
        }
        return (<LoginComponent associateId={this.props.associateId} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleOnChange(event)} onLogin={() => this.handleOnLogin()} />);
    }
}

const mapStateToProps = ({ login: login }: any) => {
    return {
        associateId: login.associateId,
        isAuthenticated: login.isAuthenticated,
        isAdmin: login.isAdmin
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
