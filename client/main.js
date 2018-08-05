import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";
import App from "../imports/client/App";

import "./main.html";
import "../imports/startup/accounts-config.js";

Meteor.startup(() => {
    render(<App />, document.getElementById("app"));
});
