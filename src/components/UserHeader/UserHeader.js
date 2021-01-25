import React from 'react';
import './UserHeader.css';

const UserHeader = ({ userName, avatar, moviesData }) => {
    return (
        <div className="userHeader">
            <div className="userHeader__avatar">
                <img src={avatar} />
            </div>
            <div className="userHeader__user">
                <div className="userHeader__userName">
                    <h2>{userName}</h2>
                </div>
                <div className="userHeader__userData">
                    <p>Watchlist: <span>{`${moviesData.watchlist}`}</span></p>
                    <p>Favorites: <span>{`${moviesData.favorite}`}</span></p>
                    <p>Watched: <span>{`${moviesData.watched}`}</span></p>
                </div>
            </div>
        </div>
    )
}

export default UserHeader
