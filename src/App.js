import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.components";
import BugsList from "./components/bugs-list.component";
import EditBug from "./components/edit-bug.component";
import CreateBug from "./components/create-bug.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        {/* <p>Helsdvfvfdvfslo world</p> jkjkbhjbdscgsdcxxhbhj*/}
        <Route path="/" exact component={BugsList} />
        <Route path="/edit/:id" component={EditBug} />
        <Route path="/create" component={CreateBug} />
        <Route path="/user" component={CreateUser} />
        </div>
    </Router>
  );
}

export default App;
