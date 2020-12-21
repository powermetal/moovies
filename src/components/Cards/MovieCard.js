import React from 'react';
import './MovieCard.css';
import { Link } from 'react-router-dom';

const MovieCard = ({ poster, title, rating, id }) => {
    const ratingColor = (rating) => {
        if (rating <= 25)
            return 'red'
        else if (rating > 25 && rating < 50)
            return 'orange'
        else if (rating >= 50 && rating < 75)
            return 'yellow'
        else if (rating >= 75 && rating <= 100)
            return 'green'
    }

    return (
        <div className="movie_card">
            <Link to={`/movie/${id}`}>
                <div className={`movie_card__poster`}>
                    <img src={poster} />
                    <h4 className={`movie_card__rating ${ratingColor(rating)}`}>{rating}</h4>
                </div>
            </Link>
            <div className="movie_card__title">
                <Link to={`/movie/${id}`}> <h4>{title}</h4></Link>
            </div>
        </div>
    )
}

export default MovieCard
