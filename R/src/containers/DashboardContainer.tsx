import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadDashboard } from '../actions/DashboardActions';
import DashboardComponent from '../components/DashboardComponent';
import { Dashboard } from '../ApiClient';

export interface IDashboardProps {
    loadDashboard(): void;
    dashboard: Dashboard[];
}

export interface IDashboardState {
    dashboard: Dashboard[];
    message: string;
}

class DashboardContainer extends React.Component<IDashboardProps, IDashboardState> {
    public componentWillMount() {
        this.props.loadDashboard();
    }

    public render() {
        return (
            <DashboardComponent dashboard={this.props.dashboard} />
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        dashboard: state.data.dashboard
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadDashboard
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
