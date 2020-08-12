import React, { Component } from 'react';
import rootContext from '../../context/rootContext';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export default class AddEventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            progress: false,
            completed: false,
            successed: false,
            startingDate: new Date(),
            endingDate: new Date()
        };
        this.nameRef = React.createRef();
        this.expenditureRef = React.createRef();
    }

    static contextType = rootContext;

    _changeStartingDate = startingDate => {
        if(startingDate > this.state.endingDate){
            this.setState({startingDate: startingDate, endingDate: startingDate});
        }
        else{
            this.setState({startingDate});
        }
    }

    _changeEndingDate = endingDate => {
        this.setState({endingDate});
    }
  
    async _addEvent(name, expenditure) {
        try {
            const requestBody = {
                name: name,
                expenditure: expenditure,
                startingDate: this.state.startingDate.toISOString(),
                endingDate: this.state.endingDate.toISOString()
            }
            const res = await fetch('http://localhost:8080/events',{
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

    _add = () => {
        const expenditure = parseInt(this.expenditureRef.current.value);
        const name = this.nameRef.current.value;
        if(name !== '' && !isNaN(expenditure) && expenditure >= 0){
            this._addEvent(name, expenditure);
            this.setState({progress: true, error: null});
        }
        else {
            this.setState({error: 'Oops! Invalid input...'})
        }
    }

    render() {
        return (
            <div className="my-model" >
                <div className="model-body rounded-lg">
                    <header className="p-3 rounded-top bg-myc text-white">
                        <i className="fas fa-calendar-plus fa-lg p-2 text-white"></i>
                        <strong>Add new event or maintenance</strong>
                    </header>
                    {
                        (this.state.progress !== true) ? (
                        <>
                            <section className="p-3 pb-0 text-myc">
                                <strong className="d-flex flex-column">{
                                    (this.state.completed !== true) ? (
                                        <>
                                            <label className="mb-1">Name</label>
                                            <input type="text" placeholder="Enter the name" ref={this.nameRef} className="text-myc-bold w-100 form-control input-border mb-3" autoFocus required/>
                                            <label className="mb-1">Expenditure</label>
                                            <input type="number" placeholder="Enter the expenditure" ref={this.expenditureRef} className="text-myc-bold w-100 form-control input-border mb-3" required/>
                                            <div className="d-flex">
                                                <span className="w-25 py-2"> Starting Date</span>
                                                <DatePicker  className="text-myc-bold w-100 form-control input-border mb-3" selected={this.state.startingDate} onChange={this._changeStartingDate} minDate={new Date()}/>
                                            </div>
                                            <div className="d-flex">
                                                <span className="w-25 py-2"> Starting Date</span>
                                                <DatePicker  className="text-myc-bold w-100 form-control input-border mb-3" selected={this.state.endingDate} onChange={this._changeEndingDate} minDate={this.state.startingDate}/>
                                            </div>
                                            <small className="d-flex text-danger justify-content-center" >{this.state.error}</small>
                                        </>
                                    ) : (
                                        <div className="d-flex justify-content-center">
                                            <h2 className=""> {this.state.successed === true ? "Successfully added..." : "Failed..."}</h2>
                                        </div>
                                    )
                                }
                                </strong>
                            </section>
                            <footer className="p-3 pt-0">
                                <hr className="my-hr text-myc"/>
                                <div className="d-flex justify-content-center mr-3">
                                    {
                                        (this.state.completed !== true) ? (
                                            <>
                                                <button type="button" className="btn my-btn px-3 mx-2" onClick={this._add}>
                                                    <i className="fas fa-plus-circle mr-1"></i>
                                                    <span className="text-bold">Add</span>
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
