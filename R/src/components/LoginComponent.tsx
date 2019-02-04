import * as React from 'react';
import { ILoginProps } from '../models/Login';

const LoginComponent = (login: ILoginProps) => {
    return (
        <div className="col-md-2 col-md-offset-3">
            <h2>Login</h2>
            <form name="form" onSubmit={(event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); login.onLogin(); }}>
                <div>
                    <label htmlFor="username">{login.adminLogin ? 'Username' : 'Associate Id'}</label>
                    <input
                        type="number"
                        className="form-control"
                        name="username"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => login.onChange(event)}
                    />
                </div>
                {login.adminLogin && <div>
                    <label htmlFor="username">Password</label>
                    <input
                        type="number"
                        className="form-control"
                        name="username"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => login.onChange(event)}
                    />
                </div>}
                <br />
                <div className="form-group">
                    <button type="submit" disabled={!login.associateId} className="btn btn-primary">Login</button>
                    {!login.adminLogin && <span className="pull-right">Admin Login</span>}
                </div>
            </form>
        </div>);
};

export default LoginComponent;