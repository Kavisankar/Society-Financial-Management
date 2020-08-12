import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';
import rootContext from '../../context/rootContext';

export default class Navigator extends Component {
    static contextType = rootContext;

    render() {
        return (
            <div className="bg-dark shadow" >
                <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-myc text-light">
                    <Logo />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collasde navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                            </li>
                            {
                                (this.context.principal === 0) ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">Login</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                        </li>
                                    </>
                                ):(
                                    <>
                                        <li className="nav-item">
                                          <NavLink className="nav-link" to="/account">My Account</NavLink>
                                        </li>
                                        {
                                            (this.context.isManager === true) ? (
                                                <>
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/members">Members</NavLink>
                                                    </li>
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/households">Households</NavLink>
                                                    </li>
                                                </>
                                            ) : (<></>)
                                        }
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href={'#"'} role="button" aria-haspopup="true" aria-expanded="false">Documents</a>
                                            <div className="dropdown-menu bg-myc">
                                                <NavLink className="nav-link" to="/maintenance">Events and Maintenance</NavLink>
                                                <div className="dropdown-divider"></div>
                                                <NavLink className="nav-link" to="/payments">Payment Transactions</NavLink>
                                                <div className="dropdown-divider"></div>
                                                <NavLink className="nav-link" to="/defaulters">Defaulters</NavLink>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <button type="button" className="btn nav-link" onClick={this.context.logout}>Logout</button>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
