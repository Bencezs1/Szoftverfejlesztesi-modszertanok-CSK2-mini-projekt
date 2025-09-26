import React, {useState,useEffect} from 'react'
import JokeCard from '../components/JokeCard/JokeCard'
import { useAuth } from "../auth/useAuth";

const home = () => {

  const { apiFetch } = useAuth();
  const [joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      async function loadJoke() {
        try {
          const res = await apiFetch("/api/alljokes/");
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
    }, []);

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {joke.map((joke) => (
          <div key={joke.id} className="col-12 col-md-6 col-lg-4">
            <JokeCard joke={joke} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default home