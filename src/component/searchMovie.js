import React, {useState} from "react";
import MovieCard from './movieCard.js';

export default function SearchMovie(){

      //states input query, movies
    const [query, setQuery] = useState(null);
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchMovies = async (e) => {
        setLoading(true);
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=013b92c0b7edec3ee6b2b16351102306&language=fr-FR&query=${query}&page=1&include_adult=false`;

        try{        
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        }catch(err){
            setError('Failed to fetch movies');
            setMovies([]);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">FILM :</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park" value={query} onChange={(e) => setQuery(e.target.value)} required/>
                <button className="button" type="submit">Recherche ! </button>
            </form>

            {loading && <p className="flash info">Chargement...</p>}
            {error && <p className="flash error">{error}</p>}
            {!loading && !error && (
                <div className="card-list">
                    {movies &&
                        movies
                            .filter((movie) => movie.poster_path)
                            .map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                </div>
            )}
        </div>
    );
}