import React, { useContext } from "react";
import Card from "./Card";
import noteContext from "../context/notes/noteContext";

export default function NoteItem({ note, updateNote }) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  console.log(updateNote)
  return (
    <>
      <Card note={note} deleteNote={deleteNote} updateNote = {updateNote}/>
    </>
  );
}
