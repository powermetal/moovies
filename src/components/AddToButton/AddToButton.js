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
import { getUpdatedMovies, addToFirestore, removeFromFirestore, isInWatchlist, isInFavorites, isInWatched } from '../../redux/movies';

const AddToButton = props => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUser)
    const movies = useSelector(selectMovies)

    const inWatchlist = isInWatchlist(movies, props.id)
    const inFavorite = isInFavorites(movies, props.id)
    const inWatched = isInWatched(movies, props.id)

    const updateMovie = (movie, properties, remove) => {
        const newMovie = getUpdatedMovies(movies, movie, properties)
        if (remove) {
            removeFromFirestore(newMovie, userId, properties)
            dispatch(removeFromMovies(newMovie))
        }
        else {
            addToFirestore(newMovie, userId)
            dispatch(addToMovies(newMovie))
        }
    }

    const toWatchlist = () => {
        updateMovie({ name: props.title, id: props.id }, { watchlist: !inWatchlist }, inWatchlist)
    }

    const toFavorites = () => {
        updateMovie({ name: props.title, id: props.id }, { favorite: !inFavorite }, inFavorite)
    }

    const toWatched = () => {
        updateMovie({ name: props.title, id: props.id }, { watched: !inWatched }, inWatched)
    }

    const renderButton = () => {
        if (props.buttonType === 'watchlist' && inWatchlist)
            return <div title="Remove from Watchlist" onClick={() => toWatchlist()}><RemoveIcon /></div>
        else if (props.buttonType === 'watchlist' && !inWatchlist)
            return <div title="Add to Watchlist" onClick={() => toWatchlist()}><AddIcon /></div>
        else if (props.buttonType === 'favorites' && inFavorite)
            return <div title="Remove from Favorites" onClick={() => toFavorites()}><FavoriteIcon /></div>
        else if (props.buttonType === 'favorites' && !inFavorite)
            return <div title="Add to Favorites" onClick={() => toFavorites()}><FavoriteBorderIcon /></div>
        else if (props.buttonType === 'watched' && inWatched)
            return <div title="Remove from Watched" onClick={() => toWatched()}><VisibilityOffIcon /></div>
        else if (props.buttonType === 'watched' && !inWatched)
            return <div title="Mark as watched" onClick={() => toWatched()}><VisibilityIcon /></div>
    }

    return (
        renderButton()
    )
}

export default AddToButton