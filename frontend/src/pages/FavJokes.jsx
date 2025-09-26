import React, { useState, useEffect } from 'react'
import JokeCard from '../components/JokeCard/JokeCard'
import { useAuth } from "../auth/useAuth";



const FavJokes = () => {

  const { apiFetch } = useAuth();
  const [joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshJokes = () => {
    async function loadJoke() {
      try {
        const res = await apiFetch("/api/jokes/");
        if (!res.ok) throw new Error("Failed to fetch joke");
        const data = await res.json();
        setJoke(data);
      } catch (err) {
        setError(err)
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadJoke();
  }
  useEffect(() => {
    async function loadJoke() {
      try {
        const res = await apiFetch("/api/jokes/");
        if (!res.ok) throw new Error("Failed to fetch joke");
        const data = await res.json();
        setJoke(data);
      } catch (err) {
        setError(err)
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadJoke()
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
          <JokeCard joke={joke} refreshJokes={refreshJokes}/>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <JokeCard joke={joke} refreshJokes={refreshJokes} />
        </div>
      </div>
    </div>
  )
}

export default FavJokes