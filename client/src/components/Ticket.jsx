import React, { useEffect, useState } from 'react';
//import './App.css';


const showFullDate = (ms) => {
    const createdAt = new Date(ms);
    return `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()} 
    ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
}

function Ticket({ ticket, handleClick }) {

    const showLabel = (ticket) => {
        return ticket.labels.map(label => (<div className="label" key={label}>{label}</div>))
    }

    return (
        <div className="ticket">
            <button className='hideTicketButton' onClick={()=>handleClick(ticket.id)}>HIDE</button>
            id: {ticket.id}, <br />
            title: {ticket.title},<br />
            creation: {showFullDate(ticket.creationTime)}<br />
            mail: {ticket.userEmail}<br />
            content: {ticket.content} <br />
            {ticket.labels && <div> labels: {showLabel(ticket)}</div>}
        <br />
        </div>
    );
}

export default Ticket;
