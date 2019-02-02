import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import SessionManagement from '../../utils/SessionManagement';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export class PrivateRoute extends Route<PrivateRouteProps> {
    public render() {
        const { component: Component, ...rest }: PrivateRouteProps = this.props;
        const renderComponent: RenderComponent = (props) => (
            SessionManagement.GetToken()
                ? <Component {...props} />
                : <Redirect to="/login" />
        );

        return (
            <Route {...rest} render={renderComponent} />
        );
    }
}