// necessary dependencies
const path = require('path');
const express = require('express');
const fs = require('fs');


// setting up server 
const app = express();
const PORT = process.env.PORT || 8800;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//notes routing
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//api to notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});


//new note code POST route
app.post("/api/notes", (req, res) => {
    let createNote = req.body;
    let notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notesLength = (notesList.length).toString();

    //id for new note
    createNote.id = notelenght;
    notesList.push(createNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesList));
    res.json(notesList);
})



//listening to server
app.listen(PORT, () => console.log("Nate your port is on" + PORT));