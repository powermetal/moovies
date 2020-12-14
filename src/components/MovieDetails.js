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
import PeopleCard from './PeopleCard';
import accounting from 'accounting-js';

const MovieDetails = (props) => {
    const [movieDetails, setMovieDetails] = useState({
        genres: [],
        videos: [],
        director: '',
        keywords: [],
        cast: [],
        crew: []
    })
    const [openTrailer, setOpenTrailer] = useState(false)
    const [people, setPeople] = useState('cast')

    useEffect(() => {
        const getMovieDetails = async () => {
            const id = props.match.params.id
            const results = await getMovie(id)
            setMovieDetails(results)
        }
        getMovieDetails()
    }, [])


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
        return movieDetails.userScore * 10 + '%'
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
                <div className="play_trailer" onClick={e => setOpenTrailer(true)}>
                    <PlayArrowIcon /><p>Play Trailer</p>
                </div>
            )
    }

    const renderKeywords = () => {
        return movieDetails.keywords.map(k => <span className="movie_details__keyword">{k.name}</span>)
    }

    return (
        <div className="movie_details">
            <YoutubeModal open={openTrailer} onClose={() => setOpenTrailer(false)} videoId={movieDetails.videos.length > 0 ? movieDetails.videos[0].key : null} title={movieDetails.title} />
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
            <div className="movie_details__body">
                <div className="movie_details__main">
                    <div className="movie_details__pagination">
                        <div className="movie_details__pagination__header">
                            <PaginatedContainer
                                items={movieDetails[people] && movieDetails[people]
                                    .map(cast => <PeopleCard name={cast.name} role={cast.role} photo={cast.photo} />)}
                                pageLimit={10}
                                tabs={[{ value: 'cast', label: `Cast (${movieDetails.cast.length})` }, { value: 'crew', label: `Crew (${movieDetails.crew.length})` }]}
                                onTabClicked={(tabValue) => setPeople(tabValue)}
                            />
                        </div>
                    </div>
                    <div className="movie_details__extra">
                        <h4>Status</h4>
                        <p>{movieDetails.status}</p>
                        <h4>Original Language</h4>
                        <p>{movieDetails.originalLanguage}</p>
                        <h4>Budget</h4>
                        <p>{accounting.formatMoney(movieDetails.budget)}</p>
                        <h4>Revenue</h4>
                        <p>{accounting.formatMoney(movieDetails.revenue)}</p>
                        <h4 className="keywords">Keywords</h4>
                        <div className="movie_details__keywords">{renderKeywords()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;