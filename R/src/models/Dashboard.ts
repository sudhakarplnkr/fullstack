import { Dashboard } from '../typings/ApiClient';

export interface IDashboardProps {
    loadDashboard(): void;
    dashboard: Dashboard[];
    isAdmin: boolean;
}

export interface IDashboardState {
    dashboard: Dashboard[];
    message: string;
}

export class DashboardRole {
    public constructor(
        public Role: string,
        public CompletedCount: number,
        public TotalCount: number
    ) {

    }
}