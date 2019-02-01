import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import Dashboard from './DashboardContainer';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute';
import LoginContainer from './LoginContainer';
import LogOutContainer from './LogOutContainer';
import ProjectBatchComponent from '../components/ProjectBatchComponent';

const AssociateDetail = () => <h2>Associate Detail</h2>;
const KtDetail = () => <h2>Kt Detail</h2>;
interface IAppState {
    isAuthenticated: boolean;
}

interface Link {
    name: string;
    to: string;
}

export class App extends React.Component<{}, IAppState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    public componentDidMount() {
        this.setState({ isAuthenticated: sessionStorage.getItem('AssociateId') ? true : false });
    }

    private onAuthenticated = () => {
        this.setState({ isAuthenticated: true });
    }

    private onLogOut = () => {
        this.setState({ isAuthenticated: false });
    }

    public render() {
        const menuLinks: Link[] = [
            { name: 'Project Batch', to: '/project-batch' },
            { name: 'Associate Detail', to: '/associate-detail' },
            { name: 'Kt Detail', to: '/kt-detail' },
            { name: 'Logout', to: '/logout' }
        ];
        const LinksComponent = ({ links }: { links: Link[] }) => {
            return (
                <React.Fragment>
                    {
                        links && links.map((link: Link) => {
                            return <li key={link.name}><NavLink activeClassName="active" to={link.to} {...this.props}>{link.name}</NavLink></li>;
                        })
                    }
                </React.Fragment>
            );
        };
        return (
            <React.Fragment>
                <Header />
                <Router>
                    <div>
                        <nav className="navbar navbar-default">
                            <div className="container-fluid">
                                <ul className="nav navbar-nav">
                                    {this.state.isAuthenticated &&
                                        <>
                                            <li>
                                                <NavLink activeClassName="active" to="/" exact={true}>Dashboard</NavLink>
                                            </li>
                                            <LinksComponent links={menuLinks} />
                                        </>
                                    }
                                    {!this.state.isAuthenticated &&
                                        <li>
                                            <NavLink activeClassName="active" to="/login">Login</NavLink>
                                        </li>}

                                </ul>
                            </div>
                        </nav>
                        <PrivateRoute path="/" exact={true} component={Dashboard} />
                        <Route path="/login" component={() => <LoginContainer onAuthenticated={() => this.onAuthenticated()} />} />
                        <Route path="/logout" component={() => <LogOutContainer onLogOut={() => this.onLogOut()} />} />
                        <PrivateRoute path="/project-batch" component={ProjectBatchComponent} />
                        <PrivateRoute path="/associate-detail" component={AssociateDetail} />
                        <PrivateRoute path="/kt-detail" component={KtDetail} />
                    </div>
                </Router>
                <Footer />
            </React.Fragment>);
    }
}
