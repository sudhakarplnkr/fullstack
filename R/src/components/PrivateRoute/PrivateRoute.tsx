import { RouteComponentProps, RouteProps, Route, Redirect } from 'react-router';
import * as React from 'react';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode;

export class PrivateRoute extends Route<PrivateRouteProps> {
    public render() {
        const { component: Component, ...rest }: PrivateRouteProps = this.props;
        const renderComponent: RenderComponent = (props) => (
            sessionStorage.getItem('AssociateId')
                ? <Component {...props} />
                : <Redirect to="/login" />
        );

        return (
            <Route {...rest} render={renderComponent} />
        );
    }
}