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
    createNote.id = notesLength;
    notesList.push(createNote);

    

    //writes teh note to db json
    fs.writeFileSync("./db/db.json", JSON.stringify(notesList));
    res.json(notesList);
})

// delete note
app.delete("/api/notes/:id", (req, res) => {
    let notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();

    notesList = notesList.filter(selected =>{
        return selected.id != noteId;
    })

    //runs the deletion back to db json with writeFileSync
    fs.writeFileSync("./db/db.json", JSON.stringify(notesList));
    res.json(notesList);
})

//back to main page route, the public indes.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//listening to server, server log and port
app.listen(PORT, () => console.log("Nate your port is on " + PORT));