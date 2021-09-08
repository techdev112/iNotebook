import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNotes() {
  const context = useContext(noteContext);
  const { addNote } = context;
  const handleClick = () => {
    addNote(note);
  };
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <h2> Add a Note </h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </div>
    </>
  );
}
