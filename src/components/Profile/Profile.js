import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from '../MovieList/MovieList';
import { selectFavorite, selectWatched, selectWatchlist, selectUser } from '../../redux/userSlice';
import AddToButton from '../AddToButton/AddToButton';
import UserHeader from '../UserHeader/UserHeader';

const Profile = () => {

    const watchlist = useSelector(selectWatchlist)
    const favorite = useSelector(selectFavorite)
    const watched = useSelector(selectWatched)
    const user = useSelector(selectUser)

    const watchlistButton = (movie) => {
        return <AddToButton buttonType="watchlist" title={movie.name} id={movie.id} />
    }

    const favoriteButton = (movie) => {
        return <AddToButton buttonType="favorites" title={movie.name} id={movie.id} />
    }

    const watchedButton = (movie) => {
        return <AddToButton buttonType="watched" title={movie.name} id={movie.id} />
    }

    const items = {
        watchlist: {
            movies: watchlist,
            actions: [watchlistButton, favoriteButton, watchedButton],
            tab: 'Watchlist',
            default: true
        },
        favorite: {
            movies: favorite,
            actions: [watchlistButton, favoriteButton, watchedButton],
            tab: 'Favorite'
        },
        watched: {
            movies: watched,
            actions: [watchlistButton, favoriteButton, watchedButton],
            tab: 'Watched'
        }
    }

    return (
        <div>
            <UserHeader userName={user.name} avatar={user.avatar} moviesData={{ watchlist: watchlist.length, favorite: favorite.length, watched: watched.length }} />
            <MovieList items={items} />
        </div>
    )
}

export default Profile