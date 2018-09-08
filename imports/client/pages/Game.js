import React from 'react';
import Game from '../ui/Game/Game';

const GamePage = ({ match }) => <Game id={match.params.id} />;

export default GamePage;
