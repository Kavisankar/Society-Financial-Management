import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import rootContext from '../../context/rootContext';

export default class DefaulterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            defaulters: {}
        };
    }
    
    static contextType = rootContext;

    async _fetchDefaulters() {
        try {
            const res = await fetch('http://localhost:8080/defaulters', {
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
            this.setState({ defaulters: resJson, isLoading: false });
        }
        catch(err) {
            this.setState({error: err});
        }
    }

    _printTime = timestamp => {
        return new Date(timestamp).toLocaleString();
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
        if (Object.keys(this.state.defaulters).length === 0) {
            return (
                <div className="d-flex flex-column w-100 align-items-center justify-content-center screen-center">
                    <i className="fas fa-exclamation-triangle text-myc fa-5x d-block mb-3"></i>
                    <span className="d-block text-myc text-center h4"> Oops! No defaulters found. Please try again later. </span>
                </div>
            );
        }
        return (
            <>
                <section className="d-block m-4 justify-content-center text-myc">
                    <div className="d-flex justify-content-center" style={{"fontSize": "2rem"}} >
                            Defaulters
                    </div>
                    <section className="d-flex p-3 pb-0 text-myc justify-content-center">
                        <div className="model-body">
                            <table className="table border">
                                <thead className="bg-myc text-white text-center">
                                    <tr>
                                        <th scope="col">Year</th>
                                        <th scope="col">Month</th>
                                        <th scope="col">Member ID</th>
                                    </tr>
                                </thead>
                                <tbody className="text-myc text-center">
                                    {
                                        Object.entries(this.state.defaulters).map(([index, defaulter]) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{defaulter.defaulterId.year}</td>
                                                    <td>{defaulter.defaulterId.month}</td>
                                                    <td>{defaulter.defaulterId.memberId}</td>
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
