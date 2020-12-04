import React, { useEffect, useState } from 'react';
import { getMovie } from '../apis/moviedb';
import './movieDetails.css';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import StarIcon from '@material-ui/icons/Star';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import YoutubeModal from '../modals/YoutubeModal';
import PaginatedContainer from './PaginatedContainer/PaginatedContainer';

const MovieDetails = (props) => {
    //Inicializar State con valores razonables por ejemplo Video con una lista vacia
    const [movieDetails, setMovieDetails] = useState({})
    const [openTrailer, setOpenTrailer] = useState(false)

    useEffect(() => {
        const getMovieDetails = async () => {
            const id = props.match.params.id
            const results = await getMovie(id)
            setMovieDetails(results)
        }
        getMovieDetails()
    }, [])


    const getGenres = () => {
        return movieDetails.genres && movieDetails.genres.map(genre => <Link to="#">{genre.name}</Link>)
            .reduce((genreList, genre, index) => {
                genreList.push(genre)
                if (index !== movieDetails.genres.length - 1)
                    genreList.push(', ')
                return genreList
            }, [])
    }

    const formatScore = () => {
        return movieDetails.userScore * 10 + '%'
    }

    const renderDirector = () => {
        if (movieDetails.director && movieDetails.director.length > 0)
            return (
                <div className="movie_details__director">
                    <h4>{movieDetails.director}</h4>
                    <span>Director</span>
                </div>
            )
    }

    const renderTrailer = () => {
        if (movieDetails.videos && movieDetails.videos.length > 0)
            return (
                <div className="play_trailer" onClick={e => setOpenTrailer(true)}>
                    <PlayArrowIcon /><p>Play Trailer</p>
                </div>
            )
    }

    return (
        <div className="movie_details">
            <YoutubeModal open={openTrailer} onClose={() => setOpenTrailer(false)} videoId={movieDetails.videos && movieDetails.videos.length > 0 ? movieDetails.videos[0].key : null} title={movieDetails.title} />
            <div className="movie_details__header" style={{ backgroundImage: `url(${movieDetails && movieDetails.backdrop})` }}>
                <div className="backgroundGradient">
                    <div className="movie_details__poster">
                        <img src={movieDetails.poster} />
                    </div>
                    <div className="movie_details__info">
                        <div className="movie_details__title">
                            <h1>{movieDetails.title}</h1>
                            <div className="movie_details__metadata">
                                <span>{movieDetails.date}</span>
                                <span> - </span>
                                <span>{getGenres()}</span>
                            </div>
                        </div>
                        <div className="movie_details__actions">
                            <div className="userScore">
                                <div className="circleScore">
                                    <span>{formatScore()}</span>
                                </div>
                                <p>User Score</p>
                            </div>
                            <div className="circle"><AddIcon /></div>
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
            <div className="movie_details__cast">
                <PaginatedContainer items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => <div style={{ backgroundColor: 'red' }}>{e}</div>)} pageLimit={4} />
            </div>
        </div>
    )
}

export default MovieDetails;