import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket'
import './App.css';
import axios from 'axios';

function App() {
  
  const [ticketsShown,setTicketsShown] = useState([]);

  useEffect(()=>{
    showTicketsFromServer()
  },[]);

  const showTickets = (ticketsArr) => {
    ticketsArr = ticketsArr.map( ticket => {
      return <Ticket key={ticket.id} ticket={ticket} handleClick={hideTicketByClick} />
    });
    return ticketsArr;
  }

  const visualTickets = ticketsShown.filter(ticket=> !ticket.hide)
  const hidedenTicketsCounter = ticketsShown.length - visualTickets.length;

  const showTicketsFromServer = async () => {
    let ticketsArray = await (await axios.get('/api/tickets')).data;
    setTicketsShown(ticketsArray)
  }

  const showTicketByTitle = async (title) => {
    let searchTicketsArray = await (await axios.get(`/api/tickets?searchText=${title}`)).data;
    setTicketsShown(searchTicketsArray)
  }

  const hideTicketByClick = (ticketId )=> {
    let hideArray = ticketsShown.map(ticket => {
      return ticket.id === ticketId ? { ...ticket , hide : true } : ticket ;
    })
    setTicketsShown(hideArray)
  }

  const restoreHiddenTickets = () =>{
    let restorArray = ticketsShown.map(ticket => {
      return   {...ticket , hide : false }  ;
    })
    setTicketsShown(restorArray)
  }

  return (
    <main>
      <div id='header'>
        <input type='search' id='searchInput' placeholder='search' onChange={(e)=>showTicketByTitle(e.target.value)}/>
        <section id='hidden-section'>
          <div id='hideTicketsCounter'>{hidedenTicketsCounter}</div>
          {hidedenTicketsCounter ? <div>Hidden tickets:</div>:<div></div>}
          <div id='restoreHideTickets' onClick={()=>restoreHiddenTickets()}>restore</div>
        </section>
      </div>
      <section id='ticket-section'>
      {showTickets(visualTickets)}
      </section>
     
    </main>
  );
}

export default App;
