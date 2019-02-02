export interface ILoginProps {
    associateId?: number;
    onLogin(): void;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export interface ILoginState {
    associateId?: number;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

export interface ILoginContainerProps {
    associateId?: number;
    onLogin(associateId?: number): void;
    onAssociateIdChange(associateId?: number): void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}
