interface IUserToken {
    AssociateId: string;
    isAdmin: boolean;
}
class SessionManagement {

    private readonly tokenKey = 'UserToken';

    public GetToken(): IUserToken| null {
        const token = sessionStorage.getItem(this.tokenKey);
        return this.nullChecker(token);
    }

    public SetToken(token: IUserToken): void {
        sessionStorage.setItem(this.tokenKey, JSON.stringify(token));
    }

    public RemoveToken(): void {
        sessionStorage.removeItem(this.tokenKey);
    }

    private nullChecker(token: string | null): IUserToken | null {
        if (token) {
            return JSON.parse(token) as IUserToken;
        }
        return null;
    }
}

export default new SessionManagement();