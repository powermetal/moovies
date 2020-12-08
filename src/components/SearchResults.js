import React, { useEffect, useState } from 'react';
import { searchMovie } from '../apis/moviedb';
import qs from 'qs';
import './searchResults.css'
import { Link } from 'react-router-dom';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const SearchResults = (props) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [resultsData, setResultsData] = useState({ page: 1 })

    const handleLoadMore = () => {
        setLoading(true)
        const searchMovies = async () => {
            const query = qs.parse(props.location.search, { ignoreQueryPrefix: true })['q']
            const response = await searchMovie(query, resultsData.nextPage)
            setLoading(false)
            setMovies([...movies, ...response.results])
            setResultsData({
                page: response.page,
                nextPage: response.page < response.totalPages ? response.page + 1 : response.page,
                totalPages: response.totalPages
            })
        }
        searchMovies()
    }

    const infiniteRef = useInfiniteScroll({
        loading,
        hasNextPage: !resultsData.totalPages || resultsData.page < resultsData.totalPages,
        onLoadMore: handleLoadMore,
    });

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
        <div className="search_results" ref={infiniteRef}>
            {movies.map(m => toMovieCard(m))}
        </div>
    )
}

export default SearchResults
