import React from 'react';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar';
import './Header.css';
import AddToButton from '../AddToButton/AddToButton';
import { isInWatchlist, isInWatched, isInFavorites } from '../../redux/movies';
import { useSelector } from 'react-redux';
import { selectMovies } from '../../redux/userSlice';

const Header = ({ movieDetails, onPlayTrailer }) => {
    const movies = useSelector(selectMovies)

    const getGenres = () => {
        return movieDetails.genres.map(genre => <Link key={genre.id} to="#">{genre.name}</Link>)
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
                    <div className="circle" title="Play Trailer"><PlayArrowIcon /></div>
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
                        <div className='circle'><AddToButton buttonType='watchlist' title={movieDetails.title} id={movieDetails.id} /></div>
                        <div className='circle'><AddToButton buttonType='favorites' title={movieDetails.title} id={movieDetails.id} /></div>
                        <div className='circle'><AddToButton buttonType='watched' title={movieDetails.title} id={movieDetails.id} /></div>
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