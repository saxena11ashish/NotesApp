const chalk=require('chalk')
const fs =require('fs')

const getNotes = () => {
    return "Your notes..."
}

const saveNotes = (notes) => {   //saving ("notes" = array of notes) in JSON file
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
//UTILITY function
const loadNotes= () => {    //to add a note ,we load all the notes then push new note at last of array
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON) //returns an array of notes present
    } catch (e) {
        return []   //returning empty array if no notes or file (notes.json) doesn't exist
    }
    
}

// #1
const addNote = (title,body) => {
    const notes=loadNotes()
    const duplicateNote  = notes.find((note) => note.title === title)       //returns from 1st encountered duplicate
    if(!duplicateNote){
    //after loading the existing notes,we push the new note with current title and body
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added'))
    }else{
        console.log(chalk.red.inverse('Title already taken'))
    }
}


// #2
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep=notes.filter((note) =>  note.title!==title)
    if(notes.length === notesToKeep.length){
        console.log(chalk.bgRed('Note not present!'))
    }else{
        console.log(chalk.bgGreen('Note removed!'))
        saveNotes(notesToKeep)
    }
}
// #3
const listNotes=() =>{
    const notes = loadNotes()
    console.log(chalk.bgBlue('Your notes:'))    
    notes.forEach((note)=>{
        console.log(note.title)
    })
}
const readNote=(title) => {
    const notes= loadNotes()
    const note=notes.find((note) => note.title === title)
    if(!note){
        console.log(chalk.bgRed('ERROR'))
    }else{
        console.log(chalk.blue.inverse(note.title))
        console.log(note.body)
    }
}
module.exports = {
    getNotes: getNotes,     // property returning : function from above called 
    addNote: addNote,       
    removeNote: removeNote,  
    listNotes: listNotes,
    readNote: readNote
}