import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props){
        super(props);
        console.log('check 123');
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={ //state is basically how you create variables in react, you are never gonna do something like let in js
            username: ''
        };//whenever you update the state, react will automatically update the page for you
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        console.log('hiiiiiiiiiiiiiiiiiii');
        e.preventDefault(); //prevent default HTML form behaviour from taking place
        const user = {
            username: this.state.username
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log(res.data));
        this.setState({
            username: ''
        });

    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}