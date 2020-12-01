import React, { useEffect, useState } from 'react';
import { searchMovie } from '../apis/moviedb';
import qs from 'qs';
import './searchResults.css'
import { Link } from 'react-router-dom';

const SearchResults = (props) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const searchMovies = async () => {
            const query = qs.parse(props.location.search, { ignoreQueryPrefix: true })['q']
            const results = await searchMovie(query)
            setMovies(results)
        }
        searchMovies()
    }, [props.location.search])

    const toMovieCard = m => (
        <div className="search_results__card">
            <div className="search_results__poster">
                <Link to={`/movie/${m.id}`}><img src={m.poster} /></Link>
            </div>
            <div className="search_results__info">
                <div className="search_results__header">
                    <Link to={`/movie/${m.id}`}><h2>{m.title}</h2></Link>
                    <p>{m.date}</p>
                </div>
                <div className="search_results__overview">
                    <p>{m.overview.length > 0 ? m.overview : 'No overview available.'}</p>
                </div>
            </div>
        </div >
    )

    return (
        <div className="search_results">
            {movies.map(m => toMovieCard(m))}
        </div>
    )
}

export default SearchResults
