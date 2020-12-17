import React, { useEffect, useState } from 'react';
import { getMovie } from '../../apis/moviedb';
import './movieDetails.css';
import PaginatedContainer from '../PaginatedContainer/PaginatedContainer';
import PeopleCard from '../Cards/PeopleCard';
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

    return (
        <div className="movie_details">
            <YoutubeModal open={openTrailer} onClose={() => setOpenTrailer(false)} videoId={movieDetails.videos.length > 0 ? movieDetails.videos[0].key : null} title={movieDetails.title} />
            <Header movieDetails={movieDetails} onPlayTrailer={() => setOpenTrailer(true)} />
            <div className="movie_details__main">
                <div className="movie_details__people">
                    <PaginatedContainer
                        items={movieDetails[people] && movieDetails[people]
                            .map(cast => <PeopleCard name={cast.name} role={cast.role} photo={cast.photo} />)}
                        pageLimit={10}
                        tabs={[{ value: 'cast', label: `Cast (${movieDetails.cast.length})` }, { value: 'crew', label: `Crew (${movieDetails.crew.length})` }]}
                        onTabClicked={(tabValue) => setPeople(tabValue)}
                    />
                </div>
                <div className="movie_details__img">
                    <ImageSlider images={movieDetails.images.backdrops} />
                </div>
                <div className="movie_details__right"><Sidebar movieDetails={movieDetails} /></div>
            </div>
        </div>
    )
}

export default MovieDetails;