import * as React from 'react';
import { CirclePie } from 'salad-ui.chart';
import { DashboardRole } from '../models/Dashboard';
import { Dashboard } from '../typings/ApiClient';

const DashboardComponent = (props: {dashboards: Dashboard[]}) => {
    return (
        <div className="container-bottom-space">
            {props.dashboards &&
                Array.from(new Set(props.dashboards.map((single: Dashboard) => single.projectId + single.teamId)))
                    .map((item: string) => {
                        let dashboard = props.dashboards && props.dashboards.filter(
                            (singleDashboard: Dashboard) => singleDashboard.projectId + singleDashboard.teamId === item);

                        var completedPercent = Math.round((dashboard.map((c: Dashboard) => c.completedCount).reduce((a: number, b: number) => a + b, 0) / dashboard.map((c: Dashboard) => c.count).reduce((a: number, b: number) => a + b, 0)) * 100);
                        completedPercent = isNaN(completedPercent) ? 100 : completedPercent;

                        let roles: DashboardRole[] = [];

                        dashboard.forEach((roleDashboard: Dashboard) => {
                            if (roleDashboard.roleName) {
                                let role = new DashboardRole(roleDashboard.roleName, roleDashboard.completedCount, roleDashboard.count);
                                roles.push(role);
                            }
                        });
                        const option = {
                            width: 100,
                            height: 100,
                            strokeWidth: 7,
                            percent: completedPercent,
                            strokeColor: 'rgb(31, 207, 101)'
                        };

                        return <div key={item} className="col-sm-3">
                            <div className="col-sm-12">
                                <h3>{dashboard[0].teamName ? dashboard[0].projectName + ' - ' + dashboard[0].teamName : dashboard[0].projectName}</h3>
                            </div>
                            <div className="col-sm-4">
                                <CirclePie {...option} />
                            </div>
                            <div className="col-sm-6">
                                <ul>
                                    {roles && roles.map((role: DashboardRole, roleIndex: number) =>
                                        <li key={roleIndex}>{role.Role + ' : ' + role.CompletedCount + '/' + role.TotalCount}</li>
                                    )}
                                </ul>
                            </div>
                        </div>;
                    })
            }
        </div>
    );
};

export default DashboardComponent;
