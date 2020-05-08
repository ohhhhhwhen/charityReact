import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Detail from './pages/Detail';
import Nav from './components/Nav';
import NoMatch from './pages/NoMatch';
import React, { Component } from "react";
import Charity from "./components/charity2";

class App extends Component {
    render() {
            return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Charity} />
                    <Route exact path="/favorites" component={Charity} />
                    <Route exact path="/favorites/:id" component={Detail} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
            }
}

export default App;