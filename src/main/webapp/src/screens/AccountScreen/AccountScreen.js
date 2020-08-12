import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import rootContext from '../../context/rootContext';

export default class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            details: null,
            paymentsVisible: false,
            payments: {}
        };
    }
    
    static contextType = rootContext;

    async _fetchDetails() {
        try {
            const requestUrl = 'http://localhost:8080/' + (this.context.isManager === true ? 'managers/' : 'members/') + this.context.principal;
            const res = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }); 
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            const resJson = await res.json();
            this.setState({ details: resJson, isLoading: false});
        }
        catch(err) {
            this.setState({error: err});
        }
    }

    async _fetchPayments() {
        try {
            const requestUrl = 'http://localhost:8080/transactions/' + (this.context.isManager === true ? 'manager/' : 'member/') + this.context.principal;
            
            const res = await fetch(requestUrl, {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }); 
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            const resJson = await res.json();
            this.setState({ payments: resJson });
        }
        catch(err) {
            this.setState({error: err});
        }
    }

    _showPayments = () => {
        this._fetchPayments();
        this.setState({ paymentsVisible: true })
    }

    _printTime = timestamp => {
        return new Date(timestamp).toLocaleString();
    }

    _hidePayments = () => {
        this.setState({ paymentsVisible: false })
    }

    componentDidMount() {
        this._fetchDetails();
    }

    render() {
        if(this.state.error) {
            throw this.state.error;
        }
        if (this.state.isLoading) {
            return <Spinner />;
        }
        return (
            <div className="d-flex flex-column bg-myc h-100 justify-content-center align-items-center">
                {
                    (this.state.paymentsVisible !== true) ? (
                    <div className="model-body rounded-lg ">
                        <header className="p-3 d-flex align-items-center justify-content-center flex-wrap rounded-top text-myc">
                            <i className="fas fa-user fa-2x mr-2 d-inline-block"></i>
                            <strong className="my-text-lg">My Account</strong>
                        </header>
                        <hr className="text-myc m-0"/>
                        <section className="p-3 pb-0 text-myc">
                            <div className="d-flex flex-column">
                                <div className="d-flex border rounded-lg mx-1 my-2 border-myc border-thin">
                                    <span className="border bg-myc text-white rounded-lg w-25 px-3 py-1">ID</span>
                                    <span className="pl-3 py-1">{this.state.details.id}</span>
                                </div>
                                <div className="d-flex border rounded-lg mx-1 my-2 border-myc border-thin">
                                    <span className="border bg-myc text-white rounded-lg w-25 px-3 py-1">Name</span>
                                    <span className="pl-3 py-1">{this.state.details.name}</span>
                                </div>
                                <div className="d-flex border rounded-lg mx-1 my-2 border-myc border-thin">
                                    <span className="border bg-myc text-white rounded-lg w-25 px-3 py-1">Email</span>
                                    <span className="pl-3 py-1">{this.state.details.email}</span>
                                </div>
                                <div className="d-flex border rounded-lg mx-1 my-2 border-myc border-thin">
                                    <span className="border bg-myc text-white rounded-lg w-25 px-3 py-1">Mobile</span>
                                    <span className="pl-3 py-1">{this.state.details.mobile}</span>
                                </div>
                                {
                                    (this.context.isManager) ? (<></>) : (
                                        <div className="d-flex border rounded-lg mx-1 my-2 border-myc border-thin">
                                            <span className="border bg-myc text-white rounded-lg w-25 px-3 py-1">Amount to pay</span>
                                            <span className="pl-3 py-1">{this.state.details.amountToPay}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </section>
                        <hr className="text-myc m-0"/>
                        <footer className="p-3">
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn my-btn px-3 mx-2" onClick = {this._showPayments}>
                                    <i className="fas fa-file-invoice-dollar mr-1"></i>
                                    <span className="text-bold">View payment details</span>
                                </button>
                            </div>
                        </footer>
                    </div>
                    ) : 
                    (
                    <div className="model-body rounded-lg">
                        <header className="p-3 d-flex align-items-center justify-content-center flex-wrap rounded-top text-myc">
                            <i className="fas fa-file-invoice-dollar fa-2x mr-2 d-inline-block"></i>
                            <strong className="my-text-lg">{this.context.isManager ? "Approved " : "My"} Payments</strong>
                        </header>
                        <hr className="text-myc m-0"/>
                        <section className="p-3 pb-0 text-myc">
                            <table className="table">
                                <thead className="bg-myc text-white text-center">
                                    <tr>
                                        <th scope="col">Payment ID</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">{this.context.isManager ? "Member " : "Authenticator "} ID</th>
                                    </tr>
                                </thead>
                                <tbody className="text-myc text-center">
                                    {
                                        Object.entries(this.state.payments).map(([index, payment]) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{payment.id}</th>
                                                    <td>{payment.amount}</td>
                                                    <td>{this._printTime(payment.transactionTime)}</td>
                                                    <td>{this.context.isManager ? payment.transferredBy : payment.approvedBy}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </section>
                        <hr className="text-myc m-0"/>
                        <footer className="p-3">
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn my-btn px-3 mx-2" onClick = {this._hidePayments}>
                                    <i className="fas fa-user mr-1"></i>
                                    <span className="text-bold">View account details</span>
                                </button>
                            </div>
                        </footer>
                    </div>
                )
                }
            </div>
        )
    }
}
