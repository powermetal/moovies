import React from 'react';
import {
    addToMovies,
    removeFromMovies,
    selectUser,
    selectMovies
} from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getUpdatedMovies, addToFirestore, removeFromFirestore } from '../../redux/movies';

const AddToButton = props => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUser)
    const movies = useSelector(selectMovies)

    const updateMovie = (movie, properties) => {
        const newMovie = getUpdatedMovies(movies, movie, properties)
        if (props.active) {
            removeFromFirestore(newMovie, userId, properties)
            dispatch(removeFromMovies(newMovie))
        }
        else {
            addToFirestore(newMovie, userId)
            dispatch(addToMovies(newMovie))
        }
    }

    const toWatchlist = () => {
        updateMovie({ name: props.title, id: props.id }, { watchlist: !props.active })
    }

    const toFavorites = () => {
        updateMovie({ name: props.title, id: props.id }, { favorite: !props.active })
    }

    const toWatched = () => {
        updateMovie({ name: props.title, id: props.id }, { watched: !props.active })
    }

    const renderButton = () => {
        if (props.buttonType === 'watchlist' && props.active)
            return <div className="circle" title="Remove from Watchlist" onClick={() => toWatchlist()}><RemoveIcon /></div>
        else if (props.buttonType === 'watchlist' && !props.active)
            return <div className="circle" title="Add to Watchlist" onClick={() => toWatchlist()}><AddIcon /></div>
        if (props.buttonType === 'favorites' && props.active)
            return <div className="circle" title="Remove from Favorites" onClick={() => toFavorites()}><FavoriteIcon /></div>
        else if (props.buttonType === 'favorites' && !props.active)
            return <div className="circle" title="Add to Favorites" onClick={() => toFavorites()}><FavoriteBorderIcon /></div>
        if (props.buttonType === 'watched' && props.active)
            return <div className="circle" title="Remove from Watched" onClick={() => toWatched()}><VisibilityOffIcon /></div>
        else if (props.buttonType === 'watched' && !props.active)
            return <div className="circle" title="Mark as watched" onClick={() => toWatched()}><VisibilityIcon /></div>
    }

    return (
        renderButton()
    )
}

export default AddToButton