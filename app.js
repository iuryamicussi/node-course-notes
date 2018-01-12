const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

let configParameterHelpTitle = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
let configParameterHelpBody = {
    describe: 'Body description of the note',
    demand : true,
    alias: 'b'
};
var configParametersHelp = [configParameterHelpTitle,configParameterHelpBody];

const argv = yargs
    .command('add','Add a new note',{
        title:configParametersHelp[0],
        body:configParametersHelp[1]
    })
    .command('list','List all notes')
    .command('read','Read a note',{
        title:configParametersHelp[0]
    })
    .command('remove','Remove a note',{
        title:configParametersHelp[0]
    })
    .help()
    .argv;
var command = argv._[0];

if(command==='add'){
    var returnFunction = notes.addNote(argv.title,argv.body);
    let message;
    if(returnFunction == undefined)
        message = 'The title was taken';
    else
        message = `${notes.logNote(returnFunction)} \r\n Added succesfully!`
    console.log(message);
}else if(command==='list'){
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s).`)
    allNotes.forEach(element => {
        console.log(notes.logNote(element));
    });

}else if(command==='read'){
    var returnFunction = notes.getNote(argv.title);
    var message;
    if(returnFunction===undefined)
        message = 'Note not found!';
    else
        message = `${notes.logNote(returnFunction)} \r\n Found succesfully!`
    console.log(message);
}else if(command==='remove'){
    console.log(notes.removeNote(argv.title)? 'Note was removed!': 'Note not found!');
}else{
    console.log('Command not recognized');
}