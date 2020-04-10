import React, {Component} from 'react';
import DatePicker from 'react-datepicker';//import date picker
import "react-datepicker/dist/react-datepicker.css";//import styling for date picker
import axios from 'axios';

export default class EditBug extends Component{
    constructor(props){
        super(props);
        console.log('check 123');
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={ //state is basically how you create variables in react, you are never gonna do something like let in js
            username: '',
            description: '',
            status: 'Incomplete',
            date: new Date(),
            users: [],//users associated with an bug
            availableStatus: ['Incomplete','Completed',"Under Review"]
        };//whenever you update the state, react will automatically update the page for you
    }
     

    //hardcoding single user
    //a react life-cycle method: a method react will automatically call
    componentDidMount() {//automatically called right before anything displays on the page
        axios.get('http://localhost:5000/bugs/'+this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                status: response.data.status,
                date: new Date(response.data.date)
            })
        })
        .catch(function(error) {
            console.log(error);
        })
        axios.get('http://localhost:5000/users/')
        .then(response =>{
            if(response.data.length>0)
            {
                this.setState({
                    users: response.data.map(user => user.username),
                });
            }

        });
    }    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }
    onChangeStatus(e){
        this.setState({
            status: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        console.log('hiiiiiiiiiiiiiiiiiii');
        e.preventDefault(); //prevent default HTML form behaviour from taking place
        const bug = {
            username: this.state.username,
            description: this.state.description,
            status: this.state.status,
            date: this.state.date
        }
        console.log(bug);
        console.log('hell0: '+this.props.match.params.id);
        axios.post('http://localhost:5000/bugs/update/'+this.props.match.params.id,bug)
        .then(res => console.log(res.data));

        window.location ='/';//redirect to home page

    }
    render() {
        console.log('hi123');
        return (
            <div>
                <h3>Edit Bug Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user){
                                return <option
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }

                        </select>

                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}>
                        </input>
                    </div>
                    <div className="form-group">
                    <label>Status: </label>
                        <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.status}
                        onChange={this.onChangeStatus}>
                        {
                            this.state.availableStatus.map(function(status){
                                return <option
                                key={status}
                                value={status}>{status}
                                </option>;
                            })
                        }

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            /> 
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit" value="Edit Bug" className="btn btn-primary"    
                        >

                        </input>
                    </div>
                </form>
            </div>
        );
    }
}