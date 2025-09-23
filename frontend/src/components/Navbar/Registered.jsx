import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/useAuth";
import "./registered.css";

const Registered = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOpen = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to login after logout
  };

  return (
    <>
      <nav>
        <div className="container">
          <div className="logo">Logo</div>
          <div className="middle">
            <button className="favourites">Kedvencek</button>
            <button className="ownJokes">Saját viccek</button>
          </div>
          <div className="right">
            <button className="newJoke" onClick={handleOpen}>
              Új vicc
            </button>

            <div className="profile-dropdown">
              <button className="profile" onClick={handleProfileClick}>
                Profil
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                  >
                    Profil
                  </button>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Kijelentkezés
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <ReactModal
        isOpen={showForm}
        onRequestClose={handleClose}
        contentLabel="Új vicc hozzáadása"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // dark backdrop
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
    </>
  );
};

export default Registered;
