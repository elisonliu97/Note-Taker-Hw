// DEPENDENCIES
const express = require('express');
const path = require('path');
const fs = require('fs');

// EXPRESS APP
const app = express();
const PORT = process.env.PORT || 3000;

// EXPRESS APP DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// DATABASE
const notes= JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));

// ROUTES

console.log(notes)

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes))

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// SERVER LISTENING
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
