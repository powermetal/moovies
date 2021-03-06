import React, { useEffect, useState } from 'react';
import { getMovie } from '../../apis/moviedb';
import './movieDetails.css';
import PaginatedContainer from '../PaginatedContainer/PaginatedContainer';
import PeopleCard from '../Cards/PeopleCard';
import MovieCard from '../Cards/MovieCard';
import Header from './Header';
import YoutubeModal from '../../modals/YoutubeModal';
import Sidebar from './Sidebar';
import ImageSlider from '../ImageSlider/ImageSlider'

const MovieDetails = (props) => {
    const [movieDetails, setMovieDetails] = useState({
        genres: [],
        videos: [],
        director: '',
        keywords: [],
        cast: [],
        crew: [],
        relatedMovies: [],
        images: { backdrops: [], posters: [] }
    })

    const [openTrailer, setOpenTrailer] = useState(false)

    const peopleTabs = {
        cast: {
            label: `Cast (${movieDetails.cast.length})`,
            items: movieDetails.cast.map(cast => <PeopleCard name={cast.name} role={cast.role} photo={cast.photo} />),
            errMessage: `We are sorry, there is no cast info available for "${movieDetails.title}"`
        },
        crew: {
            label: `Crew (${movieDetails.crew.length})`,
            items: movieDetails.crew.map(crew => <PeopleCard name={crew.name} role={crew.role} photo={crew.photo} />),
            errMessage: `We are sorry, there is no crew info available for "${movieDetails.title}"`
        },
    }

    const relatedTab = {
        related: {
            label: 'Related Movies',
            items: movieDetails.relatedMovies.map(movie => <MovieCard title={movie.title} rating={movie.rating} poster={movie.poster} id={movie.id} />),
            errMessage: `We are sorry, there are no related movies for "${movieDetails.title}"`
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const getMovieDetails = async () => {
            const id = props.match.params.id
            const results = await getMovie(id)
            setMovieDetails(results)
        }
        getMovieDetails()
    }, [props.match.params.id])

    const renderSlider = () => {
        if (movieDetails.images.backdrops.length > 0) {
            return (
                <div className="movie_details__img">
                    <ImageSlider images={movieDetails.images.backdrops} />
                </div>
            )
        } else
            return null
    }

    return (
        <div className='movie_details'>
            <Header movieDetails={movieDetails} onPlayTrailer={() => setOpenTrailer(true)} />
            <div className="movie_details__main">
                <YoutubeModal open={openTrailer} onClose={() => setOpenTrailer(false)} videoId={movieDetails.videos.length > 0 ? movieDetails.videos[0].key : null} title={movieDetails.title} />
                <div className="movie_details__people">
                    <PaginatedContainer
                        key={`people:${movieDetails.id}`}
                        tabs={peopleTabs}
                        pageLimit={10}
                    />
                </div>
                {renderSlider()}
                <div className="movie_details__related">
                    <PaginatedContainer
                        key={`relatedMovies:${movieDetails.id}`}
                        tabs={relatedTab}
                        pageLimit={5}
                    />
                </div>
                <div className="movie_details__right"><Sidebar movieDetails={movieDetails} /></div>
            </div>
        </div>
    )
}

export default MovieDetails;