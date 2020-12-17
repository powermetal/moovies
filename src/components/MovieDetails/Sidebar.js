import React from 'react';
import accounting from 'accounting-js';
import './Sidebar.css'

const Sidebar = ({ movieDetails }) => {
    const renderKeywords = () => {
        return movieDetails.keywords.map(k => <span className="movie_details__keyword">{k.name}</span>)
    }

    return (
        <div className="movie_details__sidebar">
            <h4>Status</h4>
            <p>{movieDetails.status}</p>
            <h4>Original Language</h4>
            <p>{movieDetails.originalLanguage}</p>
            <h4>Budget</h4>
            <p>{accounting.formatMoney(movieDetails.budget)}</p>
            <h4>Revenue</h4>
            <p>{accounting.formatMoney(movieDetails.revenue)}</p>
            <h4 className="keywords">Keywords</h4>
            <div className="movie_details__keywords">{renderKeywords()}</div>
        </div>
    )
}

export default Sidebar
