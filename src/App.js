import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import About from './About/About.js';
import Sender from './Sender/Sender.js';
import Receiver from './Receiver/Receiver.js';

function App() {
    return (
        <Router>
          <div>
            <ul>
              <li>
                <Link className="link" to= '/'>Home</Link>
              </li>
              <li>
                <Link className="link" to="/sender">Write</Link>
              </li>
              <li>
                <Link className="link" to="/receiver">Read</Link>
              </li>
          </ul>

          <Switch>
            <Route path ='/receiver'>
                <Receiver />
            </ Route>
            <Route path = '/sender'>
                <Sender />
            </ Route>
            <Route path = '/'>
                <About />
            </ Route>
          </Switch>
        </div>
      </Router>
    );
}
export default App;
