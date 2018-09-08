import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {
    Form,
    FormGroup,
    Input,
    Button,
    InputGroupAddon,
    InputGroup,
} from 'reactstrap';
import { Meteor } from 'meteor/meteor';

class MessageBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            submitting: false,
            inserted: null,
        };
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitting: true });
        let { message } = this.state;
        let { room, activeUser } = this.props;

        await Meteor.callPromise('room.chat', {
            id: room,
            userId: activeUser._id,
            message,
        });

        this.setState({ message: '' });

        setTimeout(() => {
            this.setState({ submitting: false });
        }, 500);
    }

    onChange(e) {
        const val = e.target.value;

        this.setState({ message: val });
    }
    render() {
        return (
            <div className="messagebox">
                <Form
                    className="chat-message"
                    onSubmit={this.handleSubmit.bind(this)}
                >
                    <FormGroup className="m-0">
                        <InputGroup>
                            <Input
                                type="text"
                                name="message"
                                id="message"
                                placeholder="Type a message here"
                                onChange={this.onChange.bind(this)}
                                value={this.state.message}
                                autoComplete="off"
                                autoFocus
                            />
                            <InputGroupAddon addonType="append">
                                <Button
                                    color="primary"
                                    onClick={this.handleSubmit.bind(this)}
                                    disabled={
                                        this.state.message === '' ||
                                        this.state.submitting
                                    }
                                >
                                    Send
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}
export default withTracker(() => {
    return {};
})(MessageBox);
