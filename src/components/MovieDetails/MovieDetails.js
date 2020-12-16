import React, { useEffect, useState } from 'react';
import { getMovie } from '../../apis/moviedb';
import './movieDetails.css';
import PaginatedContainer from '../PaginatedContainer/PaginatedContainer';
import PeopleCard from '../Cards/PeopleCard';
import accounting from 'accounting-js';
import ImageSlider from '../ImageSlider/ImageSlider';
import Header from './Header';
import YoutubeModal from '../../modals/YoutubeModal';

const MovieDetails = (props) => {
    const [movieDetails, setMovieDetails] = useState({
        genres: [],
        videos: [],
        director: '',
        keywords: [],
        cast: [],
        crew: [],
        images: { backdrops: [], posters: [] }
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

    const renderKeywords = () => {
        return movieDetails.keywords.map(k => <span className="movie_details__keyword">{k.name}</span>)
    }

    return (
        <div className="movie_details">
            <YoutubeModal open={openTrailer} onClose={() => setOpenTrailer(false)} videoId={movieDetails.videos.length > 0 ? movieDetails.videos[0].key : null} title={movieDetails.title} />
            <Header movieDetails={movieDetails} onPlayTrailer={() => setOpenTrailer(true)} />
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
            <div className="movie_details__slider">
                <h1>Media</h1>
                <ImageSlider images={[...movieDetails.images.backdrops.slice(0, 3), ...movieDetails.images.posters.slice(0, 3)]} />
            </div>
        </div>
    )
}

export default MovieDetails;