const chalk= require('chalk')   // used for coloring the console output,npm module
const yargs= require('yargs')   // used for coloring the console output,npm module
const notes=require('./notes.js') //user made module
//notes is now an object as notes.js is exporting an object   
// Yarg version customization
yargs.version('1.1.1')
// add
yargs.command({
    command:'add',
    describe:'Adds a new note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,  //making the option compulsory
            type: 'string'  //title must be a string
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})
// remove
yargs.command({
    command:'remove',
    describe:'Removes a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
// list
yargs.command({
    command:'list',
    describe:'List the notes',
    handler(){
        notes.listNotes()
    }
})
// read
yargs.command({
    command:'read',
    describe:'For reading a note',
    builder:{
        title: {
        describe:'note title',
        demandOption:true,
        type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})
yargs.parse()   //parses the argument passed in terminal