import React from 'react';
import {
    addToWatchlist,
    selectWatchlist,
    removeFromWatchlist,
    selectUser,
    selectFavorites,
    addToFavorites,
    removeFromFavorites
} from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import db from '../../apis/firebase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RemoveIcon from '@material-ui/icons/Remove';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const AddToWatchlist = props => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUser)
    const watchlist = useSelector(selectWatchlist)
    const favorites = useSelector(selectFavorites)

    const addToFirestore = (movie) => {
        db.collection('users').doc(`${userId.googleId}`).collection(`${props.buttonType}`).doc(`${props.id}`).set(movie)
    }

    const removeFromFirestore = (id) => {
        db.collection('users').doc(`${userId.googleId}`).collection(`${props.buttonType}`).doc(`${id}`).delete()
    }

    const toWatchlist = () => {
        if (props.active) {
            removeFromFirestore(props.id)
            dispatch(removeFromWatchlist({ id: props.id }))
        }
        else {
            addToFirestore({ name: props.title, id: props.id })
            dispatch(addToWatchlist({ name: props.title, id: props.id }))
        }
    }

    const toFavorites = () => {
        if (props.active) {
            removeFromFirestore(props.id)
            dispatch(removeFromFavorites({ id: props.id }))
        }
        else {
            addToFirestore({ name: props.title, id: props.id })
            dispatch(addToFavorites({ name: props.title, id: props.id }))
        }
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
    }

    return (
        renderButton()
    )
}

export default AddToWatchlist
