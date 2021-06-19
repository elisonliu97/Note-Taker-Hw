// DEPENDENCIES
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// EXPRESS APP
const app = express();
const PORT = process.env.PORT || 3000;

// EXPRESS APP DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// DATABASE
let notes= JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json')));

// ROUTES
// GET ROUTES
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// POST ROUTES
app.post('/api/notes', (req, res) => {
    let newNote = req.body;

    // Generate unique ids for each note
    newNote.id = uuidv4();

    // push note to database and rewrite over database file
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes));
    res.json(newNote);
})

// DELETE ROUTES
app.delete('/api/notes/:id', (req, res) => {
    const chosen = req.params.id;
    // check for unique id of chosen note and return database with that unique id filtered out
    notes = notes.filter((value) => {
        return (value.id !== chosen);
    })
    // rewrite over database file with filtered database
    fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes));
    res.send(`Deleted ${chosen}`)
})



// SERVER LISTENING
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
