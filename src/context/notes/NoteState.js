import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    //get all notes
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmY2I4ZjM3OTVkNzdjOTU4M2Q1ZDRkIn0sImlhdCI6MTY3NzUwNzY0Nn0.OR_329GxpOQr-x-z6PizotNqhdLLjGLMdBBZlZj3x7Y"
            },
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    }
    //Add note
    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmY2I4ZjM3OTVkNzdjOTU4M2Q1ZDRkIn0sImlhdCI6MTY3NzUwNzY0Nn0.OR_329GxpOQr-x-z6PizotNqhdLLjGLMdBBZlZj3x7Y"

            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //Edit Note

    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmY2I4ZjM3OTVkNzdjOTU4M2Q1ZDRkIn0sImlhdCI6MTY3NzUwNzY0Nn0.OR_329GxpOQr-x-z6PizotNqhdLLjGLMdBBZlZj3x7Y"

            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic to edit the client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //Delete Note
    const deleteNote = async (id) => {
        //API call
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmY2I4ZjM3OTVkNzdjOTU4M2Q1ZDRkIn0sImlhdCI6MTY3NzUwNzY0Nn0.OR_329GxpOQr-x-z6PizotNqhdLLjGLMdBBZlZj3x7Y"

            },
        });
        const json = response.json();
        console.log(json);

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }




    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;