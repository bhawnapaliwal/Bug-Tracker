import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function SimpleCard(props){
    const useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      });
    const classes = useStyles();
    return (
        <Paper elevation={3}>
        <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
        {
            props.bug.description
        }
        </Typography>
        <Typography variant="body2" component="p">
        
        {"Assigned to "+props.bug.username}
        <br />
        {'Status of the Bug: '+props.bug.status}
        <br />
        {'Date modified: '+props.bug.date.substring(0,10)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => {
        window.location='/edit/'+props.bug._id;
   }}>Edit</Button>
        <Button size="small" color="primary" onClick={() => {
            props.deleteBug(props.bug._id)
        }}>Delete</Button>
      </CardActions>
    </Card>
    </Paper>
    );
}
const Bug = props => ( //a functional react component
    // <tr>
    //     <td>{props.bug.username}</td>
    //     <td>{props.bug.description}</td>
    //     <td>{props.bug.status}</td>
    //     <td>{props.bug.date.substring(0,10)}</td>
    //     <td>
    //         <Link to ={"/edit/"+props.bug._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteBug(props.bug._id)}}>Delete</a>
    //     </td>
    // </tr>
    
    SimpleCard(props)
)
export default class BugsList extends Component{// implemented as a class component
    constructor(props){
        super(props);

        this.deleteBug = this.deleteBug.bind(this);

        this.state = {bugs: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/bugs/')
        .then(response=>{
            this.setState({bugs: response.data});
        })
        .catch((error) => {
            console.log(error);
        });
    }

    deleteBug(id) {
        axios.delete('http://localhost:5000/bugs/'+id)
        .then(res => console.log(res.data));
        this.setState({
            bugs: this.state.bugs.filter(el => el._id !== id)
        });
    }

    bugList() {
        return this.state.bugs.map(currentbug => {
            return <Bug bug={currentbug} deleteBug={this.deleteBug} key={currentbug._id}/>;
        })
    }

    render() {
        return (
            <div>
                <p>Logged Bugs</p>
        
                    {/* <thread className="thread-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thread>
                    <tbody>
                        {this.bugList()}
                    </tbody> */}
                    {this.bugList()}

            </div>
        );
    }
}