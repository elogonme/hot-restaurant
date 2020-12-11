// Dependencies

const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Array to store tables

// let tables = [
//     {
//         id: '25',
//         name: 'John Doe',
//         email: 'john-doe@gmail.com',
//         phone: '442-234-3456'
//     },
//     {
//         id: '25',
//         name: 'John Doe',
//         email: 'john-doe@gmail.com',
//         phone: '442-234-3456'
//     }
// ];
// let waitlist = [
//     {
//         id: '30',
//         name: 'Amanda Smith',
//         email: 'amanda@get.com',
//         phone: '994-443-3456'
//     },
    
// ];

let tables = [];
let waitlist = [];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'make.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// Displays all tables
app.get('/api/tables', (req, res) => res.json(tables.slice(0, 5)));

// Displays all tables
app.get('/api/clear', (req, res) => {
    tables = [];
    waitlist = [];
    console.log('Clearing all table reservations')
    res.json(tables)
});

// Displays wait list - tables after index 4 in array
app.get('/api/waitlist', (req, res) => res.json(waitlist));

// Create New Table - takes in JSON input
app.post('/api/tables', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  const newTable = req.body;
  // If more than 5 tables in array do not return data to request
  if (tables.length >= 5) {
      console.log('Put new Table on Wait list: ', newTable);
      waitlist.push(newTable);
      res.json('waitlist');
  } else {
    console.log('Reserved new Table: ', newTable);
    tables.push(newTable);
    res.json(newTable);
  }
  
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
