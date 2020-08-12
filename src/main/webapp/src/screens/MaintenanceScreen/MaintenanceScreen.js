import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import rootContext from '../../context/rootContext';
import AddEventModal from './AddEventModal';

export default class MaintenanceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            events: {},
            addEventModalVisible: false
        };
    }
    
    static contextType = rootContext;

    async _fetchEvents() {
        try {
            const res = await fetch('http://localhost:8080/events', {
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
            this.setState({ events: resJson, isLoading: false });
        }
        catch(err) {
            this.setState({error: err});
        }
    }

    _openAddEventModal = memberId => {
        this.setState({addEventModalVisible: true});
    }

    _closeAddEventModal = _ => {
        this.setState({addEventModalVisible: false})
        this._fetchEvents();
    }

    componentDidMount() {
        this._fetchEvents();
    }

    render() {
        if(this.state.error) {
            throw this.state.error;
        }
        if (this.state.isLoading) {
            return <Spinner />;
        }
        if (this.state.addEventModalVisible === true) {
            return <AddEventModal closeModal={this._closeAddEventModal.bind(this)} />
        }
        return (
            <>
                <section className="d-block m-4 justify-content-center text-myc">
                    <div className="d-flex justify-content-center" style={{"fontSize": "2rem"}} >
                        Events and Maintenance
                    </div>
                    {
                        (this.context.isManager === true) ? (
                            <div className="d-flex justify-content-center" >
                                <button type="button" className="btn my-btn m-2 p-2" onClick={this._openAddEventModal.bind(this)}>
                                    <i className="fas fa-calendar-plus fa-lg pr-2"></i>
                                    <span className="text-bold">Add New</span>
                                </button>
                            </div>
                        ) : (<></>)
                    }
                    <section className="p-3 pb-0 text-myc">
                        <table className="table">
                            <thead className="bg-myc text-white text-center">
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Starting Date</th>
                                    <th scope="col">Ending Date</th>
                                    <th scope="col">Expenditure</th>
                                </tr>
                            </thead>
                            <tbody className="text-myc text-center">
                                {
                                    Object.entries(this.state.events).map(([index, event]) => {
                                        return (
                                            <tr key={index}>
                                                <td>{event.name}</td>
                                                <td>{event.startingDate}</td>
                                                <td>{event.endingDate}</td>
                                                <td>{event.expenditure}</td>
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
