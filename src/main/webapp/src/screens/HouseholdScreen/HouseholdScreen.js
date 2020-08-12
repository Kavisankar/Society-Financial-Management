import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import rootContext from '../../context/rootContext';
import EditHouseholdModel from './EditHouseholdModal';

export default class HouseholdScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            households: {},
            flatNo: null,
            editModelVisible: false
        };
    }
    
    static contextType = rootContext;

    async _fetchDefaulters() {
        try {
            const res = await fetch('http://localhost:8080/households', {
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
            this.setState({ households: resJson, isLoading: false });
        }
        catch(err) {
            this.setState({error: err});
        }
    }



    _openEditModal = flatNo => {
        this.setState({editModelVisible: true, flatNo: flatNo});
    }

    _closeEditModel = _ => {
        this.setState({editModelVisible: false, flatNo: null})
        this._fetchDefaulters();
    }

    componentDidMount() {
        this._fetchDefaulters();
    }

    render() {
        if(this.state.error) {
            throw this.state.error;
        }
        if (this.state.isLoading) {
            return <Spinner />;
        }
        if(this.state.editModelVisible === true) {
            return <EditHouseholdModel flatNo = {this.state.flatNo} closeModal = {this._closeEditModel.bind(this)}/>;
        }
        if (Object.keys(this.state.households).length === 0) {
            return (
                <div className="d-flex flex-column w-100 align-items-center justify-content-center screen-center">
                    <i className="fas fa-exclamation-triangle text-myc fa-5x d-block mb-3"></i>
                    <span className="d-block text-myc text-center h4"> Oops! No households found. Please try again later. </span>
                </div>
            );
        }
        return (
            <>
                <section className="d-block m-4 justify-content-center text-myc">
                    <div className="d-flex justify-content-center" style={{"fontSize": "2rem"}} >
                            Households
                    </div>
                    <section className="d-flex p-3 pb-0 text-myc justify-content-center">
                        <div className="model-body">
                            <table className="table border">
                                <thead className="bg-myc text-white text-center">
                                    <tr>
                                        <th scope="col">Flat No</th>
                                        <th scope="col">Member ID</th>
                                        <th scope="col">Edit</th>
                                    </tr>
                                </thead>
                                <tbody className="text-myc text-center">
                                    {
                                        Object.entries(this.state.households).map(([index, household]) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{household.flatNo}</td>
                                                    <td>{household.memberId === null ? 'N/A' : household.memberId}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-link m-0 p-0"  onClick={this._openEditModal.bind(this, household.flatNo)}>
                                                            <i className="fas fa-user-edit fa-lg"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </section>
                </section>
            </>
        )
    }
}
