import { Movie } from '@material-ui/icons';
import React from 'react';
import './MovieList.css';

const MovieList = ({ movies, actions }) => {

    const renderList = () => {
        return movies.map(movie => {
            return (
                <div className="movielist__item">
                    {movie.name}
                    <div className="movielist__action">
                        {actions.map(action => <span onClick={() => action.fn(movie.id)}>{action.icon(movie.id)}</span>)}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="movielist">
            {renderList()}
        </div>
    )
}

export default MovieList
