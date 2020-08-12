import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import rootContext from '../../context/rootContext';
import AddPaymentModal from './AddPaymentModal';

export default class MembersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            members: null,
            memberId: null,
            paymentModelVisible: false
        };
    }
    
    static contextType = rootContext;
  
    async _fetchMembers() {
        try {
            const res = await fetch('http://localhost:8080/members',{
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
            console.log(resJson);
            this.setState({ members: resJson, isLoading: false});
        }
        catch(err) {
            this.setState({error: err});
        }
    }

    _openPaymentModal = memberId => {
        this.setState({paymentModelVisible: true, memberId: memberId});
    }

    _closePaymentModel = _ => {
        this.setState({paymentModelVisible: false, memberId: null});
        this._fetchMembers();
    }
  
    componentDidMount() {
        this._fetchMembers();
    }

    render() {
        if(this.state.error) {
            throw this.state.error;
        }
        if (this.state.isLoading) {
            return <Spinner />;
        }
        if(this.state.paymentModelVisible === true) {
            return <AddPaymentModal memberId = {this.state.memberId} closeModal = {this._closePaymentModel.bind(this)}/>;
        }
        if (Object.keys(this.state.members).length === 0) {
            return (
                <div className="d-flex flex-column w-100 align-items-center justify-content-center screen-center">
                    <i className="fas fa-exclamation-triangle text-myc fa-5x d-block mb-3"></i>
                    <span className="d-block text-myc text-center h4"> Oops! No members found. Please try again later. </span>
                </div>
            );
        }
        return (
          <>
              <section className="d-block m-4 justify-content-center text-myc">
                  <div className="d-flex justify-content-center" style={{"fontSize": "2rem"}} >
                        Associate Members
                  </div>
                  <section className="p-3 pb-0 text-myc">
                        <table className="table">
                            <thead className="bg-myc text-white text-center">
                                <tr>
                                    <th scope="col">Member ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile No</th>
                                    <th scope="col">Amount to pay</th>
                                    <th scope="col">Pay</th>
                                </tr>
                            </thead>
                            <tbody className="text-myc text-center">
                                {
                                    Object.entries(this.state.members).map(([index, member]) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{member.id}</th>
                                                <td>{member.name}</td>
                                                <td>{member.email}</td>
                                                <td>{member.mobile}</td>
                                                <td>{member.amountToPay}</td>
                                                <td>
                                                    <button type="button" className="btn btn-link m-0 p-0" onClick={this._openPaymentModal.bind(this, member.id)}>
                                                        <i className="fas fa-money-check-alt fa-lg"></i>
                                                    </button>
                                                </td>
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
