const fs = require('fs');

const FILE_NAME = 'notes-data.json';


var fetchNotes = () => {
    var notes = [];
    try {
        var noteString = fs.readFileSync(FILE_NAME);
        return JSON.parse(noteString);
    } catch(error) {
        return [];
    }

};

var saveNotes = (notes) => {
    var notesString = JSON.stringify(notes);
    fs.writeFile(FILE_NAME, notesString, null, (err) => {
        if(err) {
            console.log("Save failed")
        }
    });
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var duplicateNote = notes.filter((note)=> note.title === title)

    if(duplicateNote.length) {
        console.log("Duplicate note ", title);
        return null;
    }

    if(!duplicateNote.length) {
        console.log("Adding note ", title);
        var newNote = {title, body};
        notes.push(newNote);
        saveNotes(notes);
        return newNote;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var noteArray = notes.filter((note) => note.title === title);
    if(noteArray.length) {
        return noteArray[0];
    }
    return null;
};

var remove = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title != title);
    var noteRemoved = notes.length !== filteredNotes.length;
    if(noteRemoved) {
        saveNotes(filteredNotes);
    }
    return noteRemoved;
}

var logNote = (note) => {
    debugger;
    console.log("---")
    console.log("Title: "+note.title);
    console.log("Body: "+note.body);
}
module.exports = {
    addNote: addNote,
    getAll,       // ES6 Syntax if exported function name same as method defined
    getNote,
    removeNote: remove,
    logNote
};

