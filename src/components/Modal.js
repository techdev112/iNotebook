import React from "react";

export default function Modal({ note, onChange, handleClick }) {
  console.log("Modla", note);

  return (
    <>
    
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  value={note.title}
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
                  value={note.description}
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
                  value={note.tag}
                  className="form-control"
                  id="tag"
                  name="tag"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleClick()}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
