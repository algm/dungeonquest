import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { Rooms } from "../../api/Rooms";
import uniqid from "uniqid";

class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            submitting: false,
            inserted: null
        };
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitting: true });
        let { name } = this.state;

        let inserted = await Rooms.insert({
            name,
            id: uniqid(),
            users: [],
            messages: [],
            createdAt: new Date() // current time
        });

        this.setState({ inserted });
    }

    onChange(e) {
        const val = e.target.value;

        this.setState({ name: val });
    }

    render() {
        let redirect = null;

        if (this.state.inserted) {
            redirect = <Redirect to={`/room/${this.state.inserted}`} />;
        }

        return (
            <Container>
                <h1>New game</h1>
                {redirect}
                <div className="newgame-form">
                    <Form
                        className="new-game"
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <FormGroup>
                            <Label for="roomName">Room name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="roomName"
                                placeholder="Room name"
                                onChange={this.onChange.bind(this)}
                                value={this.state.name}
                            />
                        </FormGroup>

                        <Button
                            color="primary"
                            className="mr-2"
                            onClick={this.handleSubmit.bind(this)}
                            disabled={
                                this.state.name === "" || this.state.submitting
                            }
                        >
                            Create
                        </Button>

                        <Link to="/" className="text-muted">
                            Cancel
                        </Link>
                    </Form>
                </div>
            </Container>
        );
    }
}

export default NewGame;
