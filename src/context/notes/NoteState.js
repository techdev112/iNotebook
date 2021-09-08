import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "61371c3cac3e9870ef1718c9",
      user: "6133e64463610872916a46ca",
      title: "My Title",
      description: "This is my first notes",
      tag: "Test",
      date: "2021-09-07T08:01:00.787Z",
      __v: 0,
    },
    {
      _id: "61371c54ac3e9870ef1718ecc",
      user: "6133e64463610872916a46ca",
      title: "My Title",
      description: "This is my first notes",
      tag: "Test",
      date: "2021-09-07T08:01:24.257Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const allNotes = async () => {
    // API Call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2U2NDQ2MzYxMDg3MjkxNmE0NmNhIn0sImlhdCI6MTYzMDgyNzMzNH0.lAY2jyvLfeGksxZaMVoI-gKd60Nscc_bKq3oOmKvjSg",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (note) => {
    console.log(note);
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2U2NDQ2MzYxMDg3MjkxNmE0NmNhIn0sImlhdCI6MTYzMDgyNzMzNH0.lAY2jyvLfeGksxZaMVoI-gKd60Nscc_bKq3oOmKvjSg",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const json = await response.json();
    setNotes([...notes, note]);
  };
  // Delete a note

  const deleteNote = async (id) => {
    // API Call

    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2U2NDQ2MzYxMDg3MjkxNmE0NmNhIn0sImlhdCI6MTYzMDgyNzMzNH0.lAY2jyvLfeGksxZaMVoI-gKd60Nscc_bKq3oOmKvjSg",
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.success) {
      setNotes(notes.filter(id !== id));
    }
    console.log(json);
    //setNotes(json)
  };
  // Edit a note
  const editNote = async (note) => {
    const url = `${host}/api/notes/updatenote/${note._id}`;
    const { title, description, tag } = note;
    
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzM2U2NDQ2MzYxMDg3MjkxNmE0NmNhIn0sImlhdCI6MTYzMDgyNzMzNH0.lAY2jyvLfeGksxZaMVoI-gKd60Nscc_bKq3oOmKvjSg",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    debugger
    console.log("backend", json)
    debugger
    const elementsIndex = notes.findIndex((element) => element._id === note._id);
    
    let newArray = [...notes];
    newArray[elementsIndex] = {...newArray[elementsIndex], ...note };
    console.log("Inbackend", newArray)
    setNotes(newArray)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, allNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
