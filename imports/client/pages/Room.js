import React from "react";
import Room from "../ui/Rooms/Room";

const RoomPage = ({ match }) => <Room id={match.params.id} />;

export default RoomPage;
