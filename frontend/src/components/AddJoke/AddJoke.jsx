import React, { useState } from "react";
import ReactModal from "react-modal";
import { useAuth } from "../../auth/useAuth";

const AddJoke = ({ handleClose, showForm, refreshJokes }) => {
  const { apiFetch, isAuthenticated } = useAuth();
  const [title, setTitle] = useState(""); // if you later want to add a title field
  const [jokeContent, setJokeContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jokeContent.trim()) return setError("A vicc szöveg nem lehet üres.");

    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/jokes/", {
        method: "POST",
        body: JSON.stringify({ joke: jokeContent }),
      });

      if (!res.ok) throw new Error("Vicce hozzáadása nem sikerült.");

      setJokeContent("");
      setTitle("");
      //refreshJokes(); // refresh the jokes list in the parent
      handleClose(); // close the modal
    } catch (err) {
      console.error(err);
      setError(err.message || "Hiba történt.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null; // don't render modal if user is not logged in, just for safety, not actually needed, the button does not show unless logged in

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
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-3">
          <label htmlFor="jokeName" className="form-label">
            Cím (opcionális)
          </label>
          <input
            type="text"
            className="form-control"
            id="jokeName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Adj címet a viccnek (opcionális)"
          />
        </div>
        For later if the joke needs a title. */}
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
          ></textarea>
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
