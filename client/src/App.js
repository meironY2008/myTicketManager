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
      <input type='search' id='searchInput' placeholder='search' onChange={(e)=>showTicketByTitle(e.target.value)}/>
      <button id='restoreHideTickets' onClick={()=>restoreHiddenTickets()}>restore</button>
      <div id='hideTicketsCounter'>{hidedenTicketsCounter}</div>
      {showTickets(visualTickets)}
    </main>
  );
}

export default App;
