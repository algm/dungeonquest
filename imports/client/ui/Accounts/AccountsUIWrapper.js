import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";

export default class AccountsUIWrapper extends Component {
    componentDidMount() {
        this.mounted = false;
    }
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }

    initializeView(el) {
        // Use Meteor Blaze to render login buttons
        if (!this.mounted) {
            this.view = Blaze.render(Template.loginButtons, el);
            this.mounted = true;
        }
    }

    render() {
        // Just render a placeholder container that will be filled in
        return <div ref={this.initializeView.bind(this)} />;
    }
}
