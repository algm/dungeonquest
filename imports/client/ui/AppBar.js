import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from "reactstrap";
import { Link } from "react-router-dom";
import AccountsUIWrapper from "./Accounts/AccountsUIWrapper.js";

export default class AppBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <Navbar light expand="md">
                <Container>
                    <NavbarBrand tag={Link} to="/">
                        <img className="brand-logo" src="/img/logo.png" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/newgame">
                                    New game
                                </NavLink>
                            </NavItem>

                            <AccountsUIWrapper />
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}
