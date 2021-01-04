import React from 'react';
import { addToWatchlist, selectWatchlist, removeFromWatchlist } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

const AddToWatchlist = (props) => {
    const dispatch = useDispatch()
    const watchlist = useSelector(selectWatchlist)

    const toWatchlist = () => {
        if (watchlist.find(m => m.id === props.id))
            dispatch(removeFromWatchlist({ id: props.id }))
        else
            dispatch(addToWatchlist({ name: props.title, id: props.id }))
    }

    return (
        <div className="circle"><AddIcon onClick={() => toWatchlist()} /></div>
    )
}

export default AddToWatchlist
