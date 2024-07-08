const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// GET /api/quotes/random route
app.get('/api/quotes/random', (req, res) => {
    res.send({ 
        quote : getRandomElement(quotes) 
    })  
})

// GET /api/quote route
app.get('/api/quotes', (req, res) => {
    if (req.query.person !== undefined) {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person);
        res.send({ 
            quotes: quotesByPerson 
        });
    } else {
        res.send({ 
            quotes: quotes 
        });
    }
})

// POST /api/quotes
app.post('/api/quotes', (req, res) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    };
    if (newQuote.quote && newQuote.person) {
        quotes.push(newQuote);
        res.send({ quote: newQuote });
    } else {
        res.status(400).send();
    }
})

// Set the server to listen on the PORT variable
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})