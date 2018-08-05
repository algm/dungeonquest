import React from "react";
import { Router, Route, Switch } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NewGame from "./pages/NewGame";
import Layout from "./Layout";
import Room from "./pages/Room";

import initSession from "./initSession";

const browserHistory = createBrowserHistory();

initSession();

const App = () => (
    <Router history={browserHistory}>
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/newgame" component={NewGame} />
                <Route path="/room/:id" component={Room} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </Router>
);

export default App;
