import React, { useEffect, useState } from "react";
//import './App.css';

function Ticket({ ticket, handleClick }) {
  const [showMoreFlag, setShowMoreFlag] = useState(false);

  const showFullDate = (ms) => {
    const createdAt = new Date(ms);
    return `${createdAt.getDate()}/${
      createdAt.getMonth() + 1
    }/${createdAt.getFullYear()} 
        ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  };

  const showLabel = (ticket) => {
    return ticket.labels.map((label) => (
      <div className="label" key={label}>
        {label}
      </div>
    ));
  };

  const showMore = () => {
    setShowMoreFlag(!showMoreFlag);
  };

  return (
    <div className="ticket">
      <button
        className="hideTicketButton"
        onClick={() => handleClick(ticket.id)}
      >
        HIDE
      </button>
      id: {ticket.id}, <br />
      <h1>{ticket.title}</h1>
      <br />
      creation: {showFullDate(ticket.creationTime)}
      <br />
      mail: {ticket.userEmail}
      <br />
      content:{" "}
      {showMoreFlag ? (
        <div>
          {ticket.content}
          <div className="show-more" onClick={() => showMore()}>
            show less
          </div>{" "}
        </div>
      ) : (
        <div>
          <div> {ticket.content.substring(0, 100)} </div>{" "}
          <div className="show-more" onClick={() => showMore()}>
            show more...
          </div>
        </div>
      )}
      {ticket.labels && <div> labels: {showLabel(ticket)}</div>}
      <br />
    </div>
  );
}

export default Ticket;
