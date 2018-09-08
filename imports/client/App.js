import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NewGame from './pages/NewGame';
import Layout from './Layout';
import Room from './pages/Room';
import Game from './pages/Game';

import initSession from './initSession';

Meteor.subscribe('games');
Meteor.subscribe('rooms');
Meteor.subscribe('users');

const browserHistory = createBrowserHistory();

initSession();

const App = () => (
    <Router history={browserHistory}>
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/newgame" component={NewGame} />
                <Route path="/room/:id" component={Room} />
                <Route path="/game/:id" component={Game} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </Router>
);

export default App;
