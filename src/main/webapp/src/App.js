import React, { Component } from 'react'
import Navigator from './components/Navigator';
import HomeScreen from './screens/HomeScreen';
import './App.sass';
import './App.css';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AuthScreen from './screens/AuthScreen';
import rootContext from './context/rootContext';
import ContactScreen from './screens/ContactScreen';
import AccountScreen from './screens/AccountScreen';
import MembersScreen from './screens/MembersScreen';
import PaymentScreen from './screens/PaymentScreen';
import HouseholdScreen from './screens/HouseholdScreen';
import DefaulterScreen from './screens/DefaulterScreen';
import MaintenaceScreen from './screens/MaintenanceScreen';


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            principal: 0,
            isManager: false
        }
    };
    
    _login = (principal, isManager) => {
        this.setState({principal, isManager});
    }

    _logout = () => {
        this.setState({principal: 0, isManager: false})
    };

    render() {
        return (
            <div className="app d-flex flex-column">
                <ErrorBoundary>
                    <rootContext.Provider value={{
                        principal: this.state.principal,
                        isManager: this.state.isManager,
                        login: this._login,
                        logout: this._logout
                    }} >
                        <BrowserRouter>
                            <Navigator />
                            <Switch>
                                <Redirect from="/" to="/home" exact />
                                <Route path="/home" component={HomeScreen} exact />
                                { this.state.principal !== 0 && <Redirect from='/login' to='/home' />}
                                { this.state.principal === 0 && <Redirect from='/account' to='/home' />}
                                { this.state.principal === 0 && <Redirect from='/members' to='/home' />}
                                { this.state.principal === 0 && <Redirect from='/households' to='/home' />}
                                { this.state.principal === 0 && <Redirect from='/documents' to='/home' />}
                                { this.state.principal === 0 && <Redirect from='/payments' to='/home' />}
                                { this.state.principal === 0 && <Redirect from='/defaulters' to='/home' />}
                                { this.state.principal === 0 && <Redirect from='/maintenance' to='/home' />}
                                { this.state.isManager !== true && <Redirect from='/members' to='/home' />}
                                { this.state.isManager !== true && <Redirect from='/households' to='/home' />}
                                <Route path="/login" component={AuthScreen} exact />
                                <Route path="/contact" component={ContactScreen} exact />
                                <Route path="/members" component={MembersScreen} exact />
                                <Route path="/households" component={HouseholdScreen} exact />
                                <Route path="/account" component={AccountScreen} exact />
                                <Route path="/payments" component={PaymentScreen} exact />
                                <Route path="/defaulters" component={DefaulterScreen} exact />
                                <Route path="/maintenance" component={MaintenaceScreen} exact />
                            </Switch>
                        </BrowserRouter>
                    </rootContext.Provider>
                </ErrorBoundary>
            </div>
        )
    }
};
