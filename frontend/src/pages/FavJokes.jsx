import React, { useState, useEffect } from 'react'
import JokeCard from '../components/JokeCard/JokeCard'
import { useAuth } from "../auth/useAuth";



const FavJokes = () => {

  const { apiFetch } = useAuth();
  const [joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFavJoke() {
      try {
        const res = await apiFetch("/api/favorites/");
        if (!res.ok) throw new Error("Failed to fetch favourite joke");
        const data = await res.json();
        setJoke(data);
      } catch (err) {
        setError(err)
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadFavJoke();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {joke.map((fav) => (
          <div key={fav.id} className="col-12 col-md-6 col-lg-4">
            <JokeCard joke={{
              id: fav.jokeid,
              username: fav.username,
              joke: fav.joke_text,
              rate: fav.rate || 0
            }} isFavoritePage={true} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavJokes