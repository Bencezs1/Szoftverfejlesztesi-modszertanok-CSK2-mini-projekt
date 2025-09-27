import React, { useState } from "react";
import ReactModal from "react-modal";
import { useAuth } from "../../auth/useAuth";

const AddJoke = ({ handleClose, showForm, onSaved }) => {
  const { apiFetch, isAuthenticated } = useAuth();
  const [jokeContent, setJokeContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) return null;

  const handleSubmit = async (e) => {
    if (!jokeContent.trim()) return setError("A vicc szöveg nem lehet üres.");

    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/jokes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ joke: jokeContent }),
      });

      if (!res.ok) throw new Error("Vicce hozzáadása nem sikerült.");

      setJokeContent("");

      
      if (typeof onSaved === "function") {
        await onSaved();
      }

      handleClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Hiba történt.");
    } finally {
      setLoading(false);
    }
  };

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
      <h2>Új vicc hozzáadása</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="jokeContent" className="form-label">
            Szöveg
          </label>
          <textarea
            className="form-control"
            id="jokeContent"
            rows="3"
            value={jokeContent}
            onChange={(e) => setJokeContent(e.target.value)}
            placeholder="A legviccesebb vicc helye"
            required
          />
        </div>
        {error && <div className="text-danger mb-2">{error}</div>}
        <div
          className="mb-3"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Mentés..." : "Mentés"}
          </button>
          <button type="button" onClick={handleClose} className="btn btn-danger">
            Mégsem
          </button>
        </div>
      </form>
    </ReactModal>
  );
};

export default AddJoke;
