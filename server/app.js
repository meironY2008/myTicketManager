const express = require('express');
const fs = require('fs').promises;
const url = require('url');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(`/api/tickets/`, async (req, res) => {
    const ticketJson = await fs.readFile('./data.json');
    const ticketArray = JSON.parse(ticketJson);
    const searchText = url.parse(req.url, true).query.searchText;
    if (searchText) {
        const filterTickectsArray = ticketArray.filter(ticket => ticket.title.toLowerCase().includes(searchText.toLowerCase()))
        res.send(filterTickectsArray);
    }
    else {
        res.send(ticketArray);
    }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
    let ticketJson = await fs.readFile('./data.json');
    let ticketsArray = JSON.parse(ticketJson);
    const doneTicketIndex = ticketsArray.findIndex(ticket => ticket.id === req.params.ticketId);
    if (doneTicketIndex >= 0) {
        ticketsArray[doneTicketIndex].done = true;
        ticketJson = JSON.stringify(ticketsArray, null, 2);
        await fs.writeFile('./data.json', ticketJson);
        res.send(ticketsArray[doneTicketIndex]);
    } else {
        res.send('No Matching Ticket Id... :(');
    }
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
    let ticketJson = await fs.readFile('./data.json');
    let ticketsArray = JSON.parse(ticketJson);
    const doneTicketIndex = ticketsArray.findIndex(ticket => ticket.id === req.params.ticketId);
    if (doneTicketIndex >= 0) {
        ticketsArray[doneTicketIndex].done = false;
        ticketJson = JSON.stringify(ticketsArray, null, 2);
        await fs.writeFile('./data.json', ticketJson);
        res.send(ticketsArray[doneTicketIndex]);
    } else {
        res.send('No Matching Ticket Id... :(');
    }
});



module.exports = app;
