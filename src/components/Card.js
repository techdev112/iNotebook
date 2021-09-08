import React from "react";
export default function Card({ note, deleteNote, updateNote }) {
  console.log(updateNote)
  return (
    <>
      <div className="col-sm-3 mx-3 my-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i
              className="fas fa-trash"
              onClick={() => deleteNote(note._id)}
            ></i>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i className="fas fa-edit" onClick = {() => updateNote(note)}></i>
            </button>
            
          </div>
        </div>
      </div>
    </>
  );
}
