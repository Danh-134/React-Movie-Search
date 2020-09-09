import React, {useState} from "react";
import MovieCard from './movieCard.js';
import './style.css';
export default function SearchMovie(){

      //states input query, movies
    const [query, setQuery] = useState('');
    //create the state for movies, and update that state appropriate
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (e) => {
    
        e.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie
        ?api_key=013b92c0b7edec3ee6b2b16351102306&language=fr-FR&query=${query}&page=1&
        include_adult=false`;

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
        <>
            
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie}  key={movie.id}/>
                ))}
            </div>
        </>     
    )
}