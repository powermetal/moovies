import React from 'react';
import accounting from 'accounting-js';
import './Sidebar.css'

const Sidebar = ({ movieDetails }) => {
    const renderKeywords = () => {
        if (movieDetails.keywords.length > 0) {
            return (
                <div className="movie_details__keywords">
                    <h4 className="keywords">Keywords</h4>
                    <div className="keywords__list">{movieDetails.keywords.map(k => <span className="movie_details__keyword">{k.name}</span>)}</div>
                </div>
            )
        }
    }

    return (
        <div className="movie_details__sidebar">
            <h4>Status</h4>
            <p>{movieDetails.status && movieDetails.status.length > 0 ? movieDetails.status : 'No info available'}</p>
            <h4>Original Language</h4>
            <p>{movieDetails.originalLanguage && movieDetails.originalLanguage.length > 0 ? movieDetails.originalLanguage : 'No info available'}</p>
            <h4>Budget</h4>
            <p>{movieDetails.budget && movieDetails.budget.length !== 0 ? accounting.formatMoney(movieDetails.budget) : 'No info available'}</p>
            <h4>Revenue</h4>
            <p>{movieDetails.revenue && movieDetails.revenue.length !== 0 ? accounting.formatMoney(movieDetails.revenue) : 'No info available'}</p>
            {renderKeywords()}
        </div>
    )
}

export default Sidebar
