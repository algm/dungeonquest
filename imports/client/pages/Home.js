import React from 'react';
import { Container } from 'reactstrap';
import RoomList from '../ui/Rooms/List';

const Home = () => (
    <Container className="page-home">
        <div className="logo text-center">
            <img src="/img/logo.png" />
        </div>
        <RoomList />
    </Container>
);

export default Home;
