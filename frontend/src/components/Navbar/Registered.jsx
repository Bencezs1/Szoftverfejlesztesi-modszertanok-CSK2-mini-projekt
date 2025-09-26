import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/useAuth";
import { Link } from 'react-router-dom'
import "./registered.css";
import AddJoke from "../AddJoke/AddJoke";

const Registered = ({refreshJokes}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
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
          <Link className="logo" to="/">
            <div className="logo">Logo</div>
          </Link>
          <div className="middle">
            <Link to="/favourite">
              <button className="favourites">Kedvencek</button>
            </Link>
            <Link to="/own">
              <button className="ownJokes">Saját viccek</button>
            </Link>
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

      <AddJoke handleClose={handleClose} showForm={showForm} refreshJokes={refreshJokes}/>
    </>
  );
};

export default Registered;
