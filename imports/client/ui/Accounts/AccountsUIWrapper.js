import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import Blaze from 'meteor/gadicc:blaze-react-component';

export default class AccountsUIWrapper extends Component {
    render() {
        let props = this.props;
        // Just render a placeholder container that will be filled in
        return <Blaze {...props} template="loginButtons" align="right" />;
    }
}
