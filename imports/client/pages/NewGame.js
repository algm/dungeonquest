import React, { Component } from 'react';
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    Card,
    CardText,
    CardTitle,
    CardDeck,
    CardBody,
    CardHeader,
    CardFooter,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Foreground from '../ui/Foreground';
import Background from '../ui/Background';
import Page from '../ui/Page';
import AppBar from '../ui/AppBar';

class NewGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            submitting: false,
            inserted: null,
            error: null,
        };
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitting: true });
        let { name } = this.state;

        try {
            let inserted = await Meteor.callPromise('room.create', {
                name,
                userId: this.props.activeUser._id,
            });

            if (!inserted) {
                this.setState({
                    error: 'A room with that name already exists!',
                    inserted: null,
                    submitting: false,
                });

                return;
            }

            this.setState({ inserted, error: null });
        } catch (err) {
            this.setState({ error: err, inserted: null, submitting: false });
        }
    }

    onChange(e) {
        const val = e.target.value;

        this.setState({ name: val });
    }

    render() {
        let redirect = null;
        const { activeUser } = this.props;
        let error = null;

        if (this.state.inserted) {
            redirect = <Redirect to={`/room/${this.state.inserted}`} />;
        }

        if (this.state.error) {
            error = <Alert color="danger">{this.state.error}</Alert>;
        }

        if (!activeUser) {
            return (
                <Container>
                    <h1>New game</h1>
                    <p>Please login to create a room</p>
                </Container>
            );
        }

        return (
            <Page>
                {redirect}
                <Background />
                <Foreground>
                    <Container>
                        <AppBar />
                        <CardDeck>
                            <Card>
                                <CardHeader>
                                    <CardTitle>New game</CardTitle>
                                </CardHeader>
                                <CardBody tag="div" className="newgame-form">
                                    <Form
                                        className="new-game"
                                        onSubmit={this.handleSubmit.bind(this)}
                                    >
                                        <FormGroup>
                                            {error}
                                            <Label for="roomName">
                                                Room name
                                            </Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="roomName"
                                                placeholder="Room name"
                                                onChange={this.onChange.bind(
                                                    this
                                                )}
                                                value={this.state.name}
                                                autoFocus
                                            />
                                        </FormGroup>

                                        <Button
                                            color="primary"
                                            className="mr-2"
                                            onClick={this.handleSubmit.bind(
                                                this
                                            )}
                                            disabled={
                                                this.state.name === '' ||
                                                this.state.submitting
                                            }
                                        >
                                            Create
                                        </Button>

                                        <Link to="/" className="text-muted">
                                            Cancel
                                        </Link>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </Container>
                </Foreground>
            </Page>
        );
    }
}

export default withTracker(() => ({ activeUser: Meteor.user() }))(NewGame);
