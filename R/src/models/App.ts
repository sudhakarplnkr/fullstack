export interface IAppProps {
    isAuthenticated: boolean;
    onLogout(): void;
    isAdmin: boolean;
}

export interface IAppState {
    isAuthenticated: boolean;
}

export interface Link {
    name: string;
    to: string;
    isAdmin: boolean;
}
