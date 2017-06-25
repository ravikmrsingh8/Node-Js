const fs = require('fs'); //import filesystem module
const yargs = require('yargs'); //import yargs module
const notes = require('./notes'); //importing notes.js file

const titleOption = {
    describe: "Title of note",
    demand: true,
    alias: 't'
};
const bodyOption = {
    describe: "Body of the note",
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command("add", "Add a new note", {title: titleOption, body: bodyOption}, (argv) => add(argv))
    .command('list', 'List all notes', () => list())
    .command('read', 'Read a note', {title: titleOption}, (argv) => read(argv))
    .command('remove', 'Remove a note', {title: titleOption}, (argv) => remove(argv))
    .help()
    .argv;

//console.log(argv);

function add(argv) {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log("Note created");
        notes.logNote(note)
    } else {
        console.log("Title taken");
    }
};

function list() {
    notes.getAll().forEach((note) => notes.logNote(note));
}

function read(argv) {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    }
    else {
        console.log("Note not found");
    }
}

function remove(argv) {
    var noteRemoved = notes.removeNote(argv.title);
    if (noteRemoved) {
        console.log("Note removed");
    } else {
        console.log("Note not found");
    }
}
