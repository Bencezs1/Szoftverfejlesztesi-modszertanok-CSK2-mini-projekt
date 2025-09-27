import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Rating from "@mui/material/Rating";
import { useAuth } from "../../auth/useAuth";

const JokeCard = ({ joke, refreshJokes }) => {
  const { apiFetch, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        if (isAuthenticated) {
          const res = await apiFetch("/api/profile/");
          if (!res.ok) throw new Error("Failed to fetch profile");
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        setError(err);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const cardHeadStyle = {
    marginBottom: "50px",
    marginTop: "20px",
  };

  const cardBodyStyle = {
    marginBottom: "40px",
  };

  const deletStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const [rating, setRating] = useState(3);
  const [showCard, setShowCard] = useState(false);

  // TODO: change to fetch instead of useState
  const [isRated, setIsRated] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const handleAddToFav = (e) => {
    e.stopPropagation();
    setIsFav(true);
  };

  const handleRate = (e) => {
    e.stopPropagation();
    setIsRated(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
  };

  const cardContent = (
    <>
      <div style={deletStyle}>
        <h5 className="card-title" style={cardHeadStyle}>
          Card title
        </h5>
        {isAuthenticated &&
          (joke.username == profile?.username ? (
            <button
              onClick={handleDelete}
              type="button"
              className="btn btn-danger"
            >
              Törlés
            </button>
          ) : !isFav ? (
            <button
              onClick={handleAddToFav}
              type="button"
              className="btn btn-warning"
            >
              Kedvencekhez adás
            </button>
          ) : (
            <span>Kedvencekhez adva</span>
          ))}
      </div>
      <p className="card-text" style={cardBodyStyle}>
        {joke.joke}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Rating
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <div>
          <span>{joke.rate}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
          </svg>
        </div>
      </div>
      <br />
      {!isRated && (
        <button onClick={handleRate} className="btn btn-primary">
          Értékelés
        </button>
      )}
      {isRated && (
        <span className="text-success">Köszönjük az értékelést!</span>
      )}
    </>
  );

  return (
    <>
      <div
        className="card"
        onClick={() => setShowCard(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-body">{cardContent}</div>
      </div>
      <ReactModal
        isOpen={showCard}
        onRequestClose={() => setShowCard(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
          content: {
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px",
          },
        }}
      >
        <div className="card">
          <div className="card-body">{cardContent}</div>
        </div>
      </ReactModal>
    </>
  );
};

export default JokeCard;
