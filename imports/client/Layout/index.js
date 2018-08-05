import React, { Component } from "react";
import AppBar from "../ui/AppBar";

class Layout extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="viewport">
                <AppBar />
                {children}
            </div>
        );
    }
}

export default Layout;
