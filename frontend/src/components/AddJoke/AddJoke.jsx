import React, { useState } from 'react'
import ReactModal from "react-modal";

const AddJoke = ({handleClose,showForm}) => {

    

  return (
    <ReactModal
        isOpen={showForm}
        onRequestClose={handleClose}
        contentLabel="Új vicc hozzáadása"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            position: "static",
            width: "500px",
            height: "400px",
            borderRadius: "10px",
            padding: "20px",
            inset: "unset",
          },
        }}
      >
        <h2>Új vicc hozzáadáas</h2>
        <form action="post">
          <div class="mb-3">
            <label for="jokeName" class="form-label">
              Cím
            </label>
            <input type="jokeName" class="form-control" id="jokeName" />
          </div>
          <div class="mb-3">
            <label for="jokeContent" class="form-label">
              Szöveg
            </label>
            <textarea class="form-control" id="jokeContent" rows="3"></textarea>
          </div>
          <div
            className="mb-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button type="button" class="btn btn-success">
              Mentés
            </button>
            <button type="button" onClick={handleClose} class="btn btn-danger">
              Mégsem
            </button>
          </div>
        </form>
      </ReactModal>
  )
}

export default AddJoke