import React, { Component } from 'react';
import rootContext from '../../context/rootContext';

export default class AddPaymentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          progress: false,
          completed: false,
          successed: false
        };
        this.amountRef = React.createRef();
    }

    static contextType = rootContext;
  
    async _makePayment(amount) {
        try {
            const requestBody = {
                transferredBy: this.props.memberId,
                approvedBy: this.context.principal,
                amount: amount

            }
            const res = await fetch('http://localhost:8080/transactions',{
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }); 
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            this.setState({progress: false, completed: true, successed: true});
        }
        catch(err) {
            this.setState({progress: false, completed: true, successed: false});
        }
    }

    _pay = () => {
        const amount = parseInt(this.amountRef.current.value);
        if(!isNaN(amount) && amount > 0){
            this._makePayment(amount);
            this.setState({progress: true});
        }
    }

    render() {
        return (
            <div className="my-model" >
                <div className="model-body rounded-lg">
                    <header className="p-3 rounded-top bg-myc text-white">
                        <i className="fas fa-money-check-alt fa-lg p-2 text-white"></i>
                        <strong>Payment Details</strong>
                    </header>
                    {
                        (this.state.progress !== true) ? (
                        <>
                            <form className="p-3 pb-0 text-myc">
                                <strong className="d-flex flex-column">{
                                    (this.state.completed !== true) ? (
                                        <>
                                            <div className="d-flex justify-content-center mb-3">
                                                <span>Member ID : {this.props.memberId}</span>
                                            </div>
                                            <div className="d-flex w-100">
                                                <span className="my-2 w-25">Amount(&#8377;)</span>
                                                <div className="d-inline-flex w-100">
                                                    <input ref = {this.amountRef} type="number" min="1" max="1000000000" className="d-flex text-myc-bold form-control input-border" defaultValue={1} required/>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="d-flex justify-content-center">
                                            <h2 className="">Payment {this.state.successed === true ? " successful..." : " failed..."}</h2>
                                        </div>
                                    )
                                }
                                </strong>
                            </form>
                            <footer className="p-3 pt-0">
                                <hr className="my-hr text-myc"/>
                                <div className="d-flex justify-content-center mr-3">
                                    {
                                        (this.state.completed !== true) ? (
                                            <>
                                                <button type="button" className="btn my-btn px-3 mx-2" onClick={this._pay}>
                                                    <i className="fas fa-money-check-alt mr-1 fa-sm"></i>
                                                    <span className="text-bold">Pay</span>
                                                </button>
                                                <button type="button" className="btn my-btn px-3 mx-2" onClick={this.props.closeModal}>
                                                    <i className="fas fa-times-circle mr-1"></i>
                                                    <span className="text-bold">Cancel</span>
                                                </button>
                                            </>
                                        ) : (
                                            <button type="button" className="btn my-btn px-3 mx-2" onClick={this.props.closeModal}>
                                                <i className="fas fa-times-circle mr-1"></i>
                                                <span className="text-bold">Close</span>
                                            </button>
                                        )
                                    }
                                </div>
                            </footer>
                        </>) : (
                            <div className="p-5">
                                <div className="d-flex justify-content-center">         
                                    <div className="spinner-border" style={{"width": "3rem", "height": "3rem"}} role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
