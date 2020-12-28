import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StarIcon from '@material-ui/icons/Star';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';
import './Header.css';
import { addToWatchlist, selectWatchlist, removeFromWatchlist } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({ movieDetails, onPlayTrailer }) => {
    const dispatch = useDispatch()
    const watchlist = useSelector(selectWatchlist)

    const toWatchlist = () => {
        if (watchlist.find(m => m.id === movieDetails.id))
            dispatch(removeFromWatchlist({ id: movieDetails.id }))
        else
            dispatch(addToWatchlist({ name: movieDetails.title, id: movieDetails.id }))
    }

    const getGenres = () => {
        return movieDetails.genres.map(genre => <Link to="#">{genre.name}</Link>)
            .reduce((genreList, genre, index) => {
                genreList.push(genre)
                if (index !== movieDetails.genres.length - 1)
                    genreList.push(', ')
                return genreList
            }, [])
    }

    const formatScore = () => {
        return movieDetails.userScore * 10
    }

    const renderDirector = () => {
        if (movieDetails.director.length > 0)
            return (
                <div className="movie_details__director">
                    <h4>{movieDetails.director}</h4>
                    <span>Director</span>
                </div>
            )
    }

    const renderTrailer = () => {
        if (movieDetails.videos.length > 0)
            return (
                <div className="play_trailer" onClick={e => onPlayTrailer()}>
                    <PlayArrowIcon /><p>Play Trailer</p>
                </div>
            )
    }

    return (
        <div className="movie_details__header" style={{ backgroundImage: `url(${movieDetails.backdrop})` }}>
            <div className="backgroundGradient">
                <div className="movie_details__poster">
                    <img src={movieDetails.poster} />
                </div>
                <div className="movie_details__info">
                    <div className="movie_details__title">
                        <h1>{movieDetails.title}</h1>
                        <div className="movie_details__metadata">
                            <span>{movieDetails.date}</span>
                            <span> | </span>
                            <span>{getGenres()}</span>
                        </div>
                    </div>
                    <div className="movie_details__actions">
                        <div className="userScore">
                            <CircularProgressBar rating={formatScore()} />
                        </div>
                        <div className="circle"><AddIcon onClick={() => toWatchlist()} /></div>
                        <div className="circle"><FavoriteIcon /></div>
                        <div className="circle"><BookmarkIcon /></div>
                        <div className="circle"><StarIcon /></div>
                        {renderTrailer()}
                    </div>
                    <div className="movie_details__tagline">
                        {movieDetails.tagline}
                    </div>
                    <div className="movie_details__overview">
                        <h2>Overview</h2>
                        <span>{movieDetails.overview}</span>
                    </div>
                    {renderDirector()}
                </div>
            </div>
        </div>
    )
}

export default Header