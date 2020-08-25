import React, { useEffect, useState } from 'react';
//import './App.css';

function Ticket({ ticket, handleClick }) {

    const showLabel = (ticket) => {
        return ticket.labels.map(label => (<div className="label" key={label}>{label}</div>))
    }

    return (
        <div className="ticket">
            <button id='hideTicketButton' onClick={()=>handleClick(ticket.id)}>HIDE</button>
            id: {ticket.id}, <br />
            title: {ticket.title},<br />
            creation: { ticket.creationTime}<br />
            mail: {ticket.userEmail}<br />
            content: {ticket.content} <br />
            {ticket.labels && <div> labels: {showLabel(ticket)}</div>}
        <br />
        </div>
    );
}

export default Ticket;
