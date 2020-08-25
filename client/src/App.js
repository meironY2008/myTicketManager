import React, { useEffect, useState } from 'react';
import Ticket from './components/Ticket'
import './App.css';
import axios from 'axios';

function App() {
  
  const [ticketsShown,setTicketsShown] = useState();
  let tickets = [];

  useEffect(()=>{
    showTicketsFromServer()
  },[]);

  const showTickets = (ticketsArr) => {
    tickets =ticketsArr;
    ticketsArr = ticketsArr.map( ticket => {
      return <Ticket key={ticket.id} ticket={ticket} handleClick={hideTicketByClick} />
    });
    setTicketsShown(ticketsArr);
  }


  const showTicketsFromServer = async () => {
    let ticketsArray = await (await axios.get('/api/tickets')).data;
    showTickets(ticketsArray)
  }

  const showTicketByTitle = async (title) => {
    let searchTicketsArray = await (await axios.get(`/api/tickets?searchText=${title}`)).data;
    showTickets(searchTicketsArray)
  }

  const hideTicketByClick = (ticketId )=> {
    let hideArray = tickets.map(ticket => {
      return ticket.id === ticketId ? { ...ticket , hide : true } : ticket ;
    })
    showTickets(hideArray.filter(ticket => !ticket.hide))
  }

  return (
    <main>
      <input type='search' id='searchInput' placeholder='search' onChange={(e)=>showTicketByTitle(e.target.value)}/>
      {ticketsShown}
    </main>
  );
}

export default App;
