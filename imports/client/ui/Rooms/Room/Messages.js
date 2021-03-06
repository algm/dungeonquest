import React, { Component } from 'react';
import Message from './Message';
import MessageBox from './MessageBox';

export default class Messages extends Component {
    componentDidMount() {
        if (this.bottomElement) {
            this.scrollToBottom();
        }
    }

    componentDidUpdate() {
        if (this.bottomElement) {
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        this.bottomElement.scrollIntoView({ behavior: 'smooth' });
    };

    render() {
        let { messages, roomId, activeUser } = this.props;
        let rendered = null;

        if (messages) {
            rendered = messages.map(msg => <Message key={msg.id} data={msg} />);
        }

        return (
            <div className="messages">
                <div className="received-messages">
                    <p className="text-muted">Room created</p>
                    {rendered}
                    <div
                        className="bottom mt-1"
                        ref={el => {
                            this.bottomElement = el;
                        }}
                    />
                </div>
                <MessageBox activeUser={activeUser} room={roomId} />
            </div>
        );
    }
}
