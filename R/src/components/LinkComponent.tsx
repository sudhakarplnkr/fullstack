import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '../models/App';

const LinksComponent = ({ links, isAuthenticated, isAdmin }: { links: Link[], isAuthenticated: boolean, isAdmin: boolean }) => {
    if (!isAuthenticated) {
        links = [{ name: 'Login', to: '/login', isAdmin: false }];
    }
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav menu-items">
                    {
                        links && links.filter(u => !u.isAdmin || isAdmin).map((link: Link) => {
                            return (
                                <li key={link.name}><NavLink activeClassName="active" to={link.to} {...this.props} exact={true}>{link.name}</NavLink></li>
                            );
                        })
                    }
                </ul>
            </div>
        </nav>
    );
};

export default LinksComponent;