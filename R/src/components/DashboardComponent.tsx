import * as React from 'react';
import { Dashboard } from '../ApiClient';
import { CirclePie } from 'salad-ui.chart';

type Props = {
    dashboard: Dashboard[];
};

const DashboardComponent = ({ dashboard: dashboards }: Props) => {
    return (
        <div>
            {dashboards && dashboards.map((dashboard: Dashboard) => {
                const option = {
                    width: 100,
                    height: 100,
                    strokeWidth: 7,
                    percent: dashboard.completedCount,
                    strokeColor: 'rgb(31, 207, 101)'
                };
                return <div key={dashboard.projectId} className="col-sm-3">
                    <div className="col-sm-12">
                        <h3>{dashboard.projectName}</h3>
                    </div>
                    <div className="col-sm-4">
                        <CirclePie {...option} />
                    </div>
                    <div className="col-sm-6">
                        <ul>
                            <li>Role1: Title</li>
                            <li>Role1: Title</li>
                            <li>Role1: Title</li>
                        </ul>
                    </div>
                </div>;
            })}

        </div>
    );
};

export default DashboardComponent;
