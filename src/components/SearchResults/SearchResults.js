import React, { useEffect, useState } from 'react';
import { searchMovie } from '../../apis/moviedb';
import qs from 'qs';
import './searchResults.css'
import { Link } from 'react-router-dom';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import AddToButton from '../AddToButton/AddToButton';
import { useSelector } from 'react-redux';
import { selectMovies } from '../../redux/userSlice';
import { isInWatchlist, isInWatched, isInFavorites } from '../../redux/movies';

const SearchResults = (props) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [resultsData, setResultsData] = useState({ page: 1 })
    const movies2 = useSelector(selectMovies)

    const searchMovies = async (nextPage, onSuccess) => {
        const query = qs.parse(props.location.search, { ignoreQueryPrefix: true })
        const response = await searchMovie(query, nextPage)
        onSuccess(response);
    }

    const getResultData = (response) => {
        return {
            page: response.page,
            nextPage: response.page < response.totalPages ? response.page + 1 : response.page,
            totalPages: response.totalPages
        }
    }

    useEffect(() => {
        const onSuccess = (response) => {
            setMovies(response.results)
            setResultsData(getResultData(response))
        }

        searchMovies(1, onSuccess)
    }, [props.location.search])

    const handleLoadMore = () => {
        setLoading(true)
        const onSuccess = (response) => {
            setLoading(false)
            setMovies([...movies, ...response.results])
            setResultsData(getResultData(response))
        }
        searchMovies(resultsData.nextPage, onSuccess)
    }

    const infiniteRef = useInfiniteScroll({
        loading,
        hasNextPage: !resultsData.totalPages || resultsData.page < resultsData.totalPages,
        onLoadMore: handleLoadMore,
    });

    const toMovieCard = m => (
        <div key={m.id} className="search_results__card">
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
            <div className="search_results__actions">
                <AddToButton buttonType="watchlist" title={m.title} id={m.id} />
                <AddToButton buttonType="favorites" title={m.title} id={m.id} />
                <AddToButton buttonType='watched' title={m.title} id={m.id} />
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
