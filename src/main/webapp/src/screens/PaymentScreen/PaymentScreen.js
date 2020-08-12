import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import rootContext from '../../context/rootContext';

export default class PaymentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            payments: {}
        };
    }
    
    static contextType = rootContext;

    async _fetchPayments() {
        try {
            const res = await fetch('http://localhost:8080/transactions/', {
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
            this.setState({ payments: resJson, isLoading: false });
        }
        catch(err) {
            this.setState({error: err});
        }
    }

    _printTime = timestamp => {
        return new Date(timestamp).toLocaleString();
    }

    componentDidMount() {
        this._fetchPayments();
    }

    render() {
        if(this.state.error) {
            throw this.state.error;
        }
        if (this.state.isLoading) {
            return <Spinner />;
        }
        if (Object.keys(this.state.payments).length === 0) {
            return (
                <div className="d-flex flex-column w-100 align-items-center justify-content-center screen-center">
                    <i className="fas fa-exclamation-triangle text-myc fa-5x d-block mb-3"></i>
                    <span className="d-block text-myc text-center h4"> Oops! No transactions found. Please try again later. </span>
                </div>
            );
        }
        return (
          <>
              <section className="d-block m-4 justify-content-center text-myc">
                  <div className="d-flex justify-content-center" style={{"fontSize": "2rem"}} >
                        All Payment Transactions
                  </div>
                  <section className="p-3 pb-0 text-myc">
                        <table className="table">
                            <thead className="bg-myc text-white text-center">
                                <tr>
                                    <th scope="col">Payment ID</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Member ID</th>
                                    <th scope="col">Authenticator ID</th>
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
                                                <td>{payment.transferredBy}</td>
                                                <td>{payment.approvedBy}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </section>
              </section>
          </>
        )
    }
}
