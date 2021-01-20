import React from 'react';
import MovieList from '../MovieList/MovieList';
import { useSelector, useDispatch } from 'react-redux';
import {
    removeFromMovies,
    addToMovies,

} from '../../redux/userSlice';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// const actions = {
//     delete:
//     {
//         icon: () => <DeleteIcon />,
//         fn: (id) => dispatch(removeFromWatchlist({ id }))
//     }
// }

const Watchlist = () => {
    // const dispatch = useDispatch()

    // const actions = [
    //     {
    //         icon: () => <DeleteIcon />,
    //         fn: (id) => dispatch(removeFromWatchlist({ id }))
    //     },
    //     {
    //         icon: (id) => watched.find(movie => movie.id === id) ? <VisibilityOffIcon /> : <VisibilityIcon />,
    //         fn: (id) => watched.find(movie => movie.id === id) ? dispatch(removeFromWatched({ id })) : dispatch(addToWatched({ id }))
    //     }
    // ]

    // return (
    //     <MovieList movies={movies} actions={actions} />
    // )
}

export default Watchlist
