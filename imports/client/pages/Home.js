import React from 'react';
import { CardDeck, Container } from 'reactstrap';
import RoomList from '../ui/Rooms/List';
import UserInfo from '../ui/User/Info';
import AppBar from '../ui/AppBar';
import Foreground from '../ui/Foreground';
import Background from '../ui/Background';
import Page from '../ui/Page';

const Home = () => (
    <Page className="page-home">
        <Background />
        <Foreground>
            <Container>
                <AppBar />
                <CardDeck>
                    <UserInfo />
                    <RoomList />
                </CardDeck>
            </Container>
        </Foreground>
    </Page>
);

export default Home;
