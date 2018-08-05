import React from "react";
import moment from "moment";
const Message = ({ data }) => (
    <div className="message" title={moment(data.time).format("LLL")}>
        <span className="text-primary">
            {"<"}
            {data.user}
            {">"}
        </span>{" "}
        {data.message}
    </div>
);

export default Message;
