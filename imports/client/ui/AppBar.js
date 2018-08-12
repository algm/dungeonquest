import React, { PureComponent } from 'react';
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
    Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import AccountsUIWrapper from './Accounts/AccountsUIWrapper';

export default class AppBar extends PureComponent {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
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
                            <NavItem className="pt-1 pl-2">
                                <AccountsUIWrapper />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}
