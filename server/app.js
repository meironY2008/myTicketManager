const express = require('express');
const fs = require('fs').promises;
const url = require('url');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(`/api/tickets/`, async (req, res) => {
    const ticketJson = await fs.readFile('./data.json');
    const ticketArray = JSON.parse(ticketJson);
    const searchText = url.parse(req.url ,true).query.searchText;
    if (searchText) {
        const filterTickectsArray = ticketArray.filter(ticket => ticket.title.toLowerCase().includes(searchText.toLowerCase()))
        res.send(filterTickectsArray);
    }
    else {
        res.send(ticketArray);
    }
});

module.exports = app;
