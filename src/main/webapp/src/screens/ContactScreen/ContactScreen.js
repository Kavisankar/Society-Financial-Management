import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import rootContext from '../../context/rootContext';

export default class ContactScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            contacts: null
        };
    }
    
    static contextType = rootContext;
  
    async _fetchContacts() {
        try {
            const res = await fetch('http://localhost:8080/managers/active',{
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
            this.setState({ contacts: resJson, isLoading: false});
        }
        catch(err) {
            this.setState({error: err});
        }
    }
  
    componentDidMount() {
        this._fetchContacts();
    }

    render() {
        if(this.state.error) {
            throw this.state.error;
        }
        if (this.state.isLoading) {
            return <Spinner />;
        }
        if (Object.keys(this.state.contacts).length === 0) {
            return (
                <div className="d-flex flex-column w-100 align-items-center justify-content-center screen-center">
                    <i className="fas fa-exclamation-triangle text-myc fa-5x d-block mb-3"></i>
                    <span className="d-block text-myc text-center h4"> Oops! No managers found. Please try again later. </span>
                </div>
            );
        }
        return (
          <>
              <section className="d-block m-4 justify-content-center text-myc">
                  <div className="d-flex justify-content-center" style={{"fontSize": "2rem"}} >
                      Contact Us
                  </div>
                  <div className="d-flex flex-wrap justify-content-around" >
                    {
                        Object.entries(this.state.contacts).map(([index, manager]) => {
                            return (
                                <div className="d-flex card mx-4 my-4 border-myc rounded-lg shadow-sm" style={{"width": "23rem"}} key={index}>
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex">
                                            <span style={{"width": "3.5rem"}}>ID</span>
                                            <span style={{"width": "1rem"}}>:</span>
                                            <span>{manager.id}</span>
                                        </div>
                                        <div className="d-flex">
                                            <span style={{"width": "3.5rem"}}>Name</span>
                                            <span style={{"width": "1rem"}}>:</span>
                                            <span>{manager.name}</span>
                                        </div>
                                        <div className="d-flex">
                                            <span style={{"width": "3.5rem"}}>Email</span>
                                            <span style={{"width": "1rem"}}>:</span>
                                            <span>{manager.email}</span>
                                        </div>
                                        <div className="d-flex">
                                            <span style={{"width": "3.5rem"}}>Mobile</span>
                                            <span style={{"width": "1rem"}}>:</span>
                                            <span>{manager.mobile}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                  </div>
              </section>
          </>
        )
    }
}
