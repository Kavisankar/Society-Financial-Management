import React, { Component } from 'react';
import rootContext from '../../context/rootContext';

export default class AuthScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            isLoginPage: true
        }
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.mobileRef = React.createRef();
        this.pswdRef = React.createRef();
        this.managerRef = React.createRef();
    }

    static contextType = rootContext;

    _switchRegiter = (isLoginPage) => {
        this.setState({isLoginPage: isLoginPage, error: ''});
    }

    _login = async () => {
        const email = this.emailRef.current.value.trim();
        const password = this.pswdRef.current.value.trim();
        const isManager = this.managerRef.current.checked;
        if (email !== '' && password !== '') {
            try {
                const requestBody = {
                    email: email,
                    password: password
                };
                const requestUrl = isManager ? 'http://localhost:8080/managers/login' : 'http://localhost:8080/members/login';
                const res = await fetch(requestUrl ,{
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                }); 
                const resJson = await res.json();
                if (res.status !== 200 && res.status !== 201) {
                    this.setState({ error: "Oops! Invalid login credentials" });
                }
                else{
                    this.context.login(resJson.id, isManager);
                }
              }
              catch(err) {
                  console.log(err);
                  this.setState({ error: 'Oops! Internal server error. Please try again later.'})
              }
        }
        else {
            this.setState({ error: 'Oops! Email and password must required.'})
        }
    }


    _signup = async () => {
        const email = this.emailRef.current.value.trim();
        const name = this.nameRef.current.value.trim();
        const mobile = this.mobileRef.current.value;
        const password = this.pswdRef.current.value.trim();
        if (email !== '' && password !== '' && name !== '' && mobile !== '') {
            try {
                const requestBody = {
                    email,
                    name,
                    mobile,
                    password
                };
                const res = await fetch('http://localhost:8080/members' ,{
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                }); 
                if (res.status !== 200 && res.status !== 201) {
                    this.setState({ error: "Oops! Invalid login credentials" });
                }
                else{
                    this._switchRegiter(true);
                }
              }
              catch(err) {
                  console.log(err);
                  this.setState({ error: 'Oops! Internal server error. Please try again later.'})
              }
        }
        else {
            this.setState({ error: 'Oops! All input fields are required.'})
        }
    }

    render() {
        return (
            <div className="d-flex flex-column bg-myc h-100 justify-content-center align-items-center">
                <div className="model-body rounded-lg ">
                    {
                        (this.state.isLoginPage === true) ? (
                            <>
                                <header className="p-3 d-flex align-items-center justify-content-center flex-wrap rounded-top text-myc">
                                    <i className="fas fa-user fa-2x mr-2 d-inline-block"></i>
                                    <strong className="my-text-lg">Login</strong>
                                </header>
                                <hr className="text-myc m-0"/>
                                <section className="p-3 pb-0 text-myc">
                                    <strong className="d-block">
                                        <label className="mb-1">Eamil</label>
                                        <input type="text" placeholder="Enter your email" ref={this.emailRef} className="text-myc-bold w-100 form-control input-border mb-3" autoFocus required/>
                                        <label className="mb-1">Password</label>
                                        <input type="password" placeholder="Enter your password" ref={this.pswdRef} className="text-myc-bold w-100 form-control input-border mb-3" required/>
                                        <div className="d-flex justify-content-center custom-control custom-checkbox">
                                            <input type="checkbox" ref={this.managerRef} className="custom-control-input mb-3" id="customCheck1" />
                                            <label className="custom-control-label" htmlFor="customCheck1">Manager</label>
                                        </div>
                                    </strong>
                                    <small className="d-flex text-danger justify-content-center" >{this.state.error}</small>
                                </section>
                                <hr className="text-myc m-0"/>
                                <footer className="p-3">
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn my-btn px-3 mx-2" onClick={this._login}>
                                            <i className="fas fa-sign-in-alt mr-1"></i>
                                            <span className="text-bold">Login</span>
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="button" disabled="disabled" className="btn btn-link px-0">
                                            <span>Don’t have an account?</span>
                                        </button>
                                        <button type="button" className="btn btn-link pl-1" onClick={this._switchRegiter.bind(this, false)}>
                                            <span>Sign up</span>
                                        </button>
                                    </div>
                                </footer>
                            </>
                        ) : (
                            <>
                                <header className="p-3 d-flex align-items-center justify-content-center flex-wrap rounded-top text-myc">
                                    <i className="fas fa-user-plus fa-2x mr-2 d-inline-block"></i>
                                    <strong className="my-text-lg">Register</strong>
                                </header>
                                <hr className="text-myc m-0"/>
                                <section className="p-3 pb-0 text-myc">
                                    <strong className="d-block">
                                        <label className="mb-1">Email</label>
                                        <input type="email" placeholder="Enter your email" ref={this.emailRef} className="text-myc-bold w-100 form-control input-border mb-3" autoFocus required/>
                                        <label className="mb-1">Name</label>
                                        <input type="text" placeholder="Enter your name" ref={this.nameRef} className="text-myc-bold w-100 form-control input-border mb-3" required/>
                                        <label className="mb-1">Mobile</label>
                                        <input type="number" min={7000000000} max={9999999999} placeholder="Enter your mobile number" ref={this.mobileRef} className="text-myc-bold w-100 form-control input-border mb-3" required/>
                                        <label className="mb-1">Password</label>
                                        <input type="password" placeholder="Enter your password" ref={this.pswdRef} className="text-myc-bold w-100 form-control input-border mb-3" required/>
                                    </strong>
                                    <small className="d-flex text-danger justify-content-center" >{this.state.error}</small>
                                </section>
                                <hr className="text-myc m-0"/>
                                <footer className="p-3">
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn my-btn px-3 mx-2" onClick={this._signup}>
                                            <i className="fas fa-sign-in-alt mr-1"></i>
                                            <span className="text-bold">Sign up</span>
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="button" disabled="disabled" className="btn btn-link px-0">
                                            <span>Have an account?</span>
                                        </button>
                                        <button type="button" className="btn btn-link pl-1" onClick={this._switchRegiter.bind(this, true)}>
                                            <span>Login</span>
                                        </button>
                                    </div>
                                </footer>
                            </>
                        )
                    }
                </div>
            </div>
        )
    }
}
