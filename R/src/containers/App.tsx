import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { onLogout } from '../actions/AppActions';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LinksComponent from '../components/LinkComponent';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import { IAppProps, Link } from '../models/App';
import SessionManagement from '../utils/SessionManagement';
import ConfigurationContainer from './ConfigurationContainer';
import Dashboard from './DashboardContainer';
import LoginContainer from './LoginContainer';
import LogoutContainer from './LogoutContainer';
import ReportContainer from './ReportContainer';

class AppComponent extends React.Component<IAppProps, {}> {
    public render() {
        const menuLinks: Link[] = [
            { name: 'Dashboard', to: '/', isAdmin: true },
            { name: 'Report', to: '/report', isAdmin: true },
            { name: 'Configuration', to: '/configuration', isAdmin: true },
            { name: 'Logout', to: '/logout', isAdmin: false }
        ];

        return (
            <React.Fragment>
                <Header />
                <Router>
                    <React.Fragment>
                        <LinksComponent links={menuLinks} isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} />
                        <PrivateRoute path="/" exact={true} component={Dashboard} />
                        <Route path="/login" component={() => <LoginContainer />} />
                        <Route path="/logout" component={() => <LogoutContainer onLogout={() => this.props.onLogout()} />} />
                        <PrivateRoute path="/report" component={ReportContainer} />
                        <PrivateRoute path="/configuration" component={ConfigurationContainer} />
                    </React.Fragment>
                </Router>
                <Footer />
            </React.Fragment>);
    }
}

const mapStateToProps = (state: any) => {
    const userToken = SessionManagement.GetToken();
    if (userToken) {
        return {
            isAuthenticated: true,
            isAdmin: userToken.isAdmin
        };
    }
    return {
        isAuthenticated: state.app.isAuthenticated,
        isAdmin: state.login.isAdmin
    };

};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            onLogout
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);