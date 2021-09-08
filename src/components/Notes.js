import React, { useContext, useEffect, useState, useRef } from "react";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";
import noteContext from "../context/notes/noteContext";
import Modal from "./Modal";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, allNotes ,editNote } = context;
  useEffect(() => {
    allNotes();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const ref = useRef(null)
  const updateNote = (currentNote) => {
  
    console.log("OneTest", currentNote)
    setNote(currentNote);
  };
  
  console.log("one",note)
  const handleClick = () => {
    editNote(note)
  };
  const onChange = (e) => {
    console.log(e.target.value)
    setNote({
      ...note,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AddNotes />
      <Modal note = {note} onChange={onChange} handleClick={handleClick}/>
      <div className="container my-3">
        <h2> Your Notes </h2>
        <div className="row">
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} updateNote={updateNote}  />
          ))}
        </div>
      </div>
    </>
  );
}
