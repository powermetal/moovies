import React from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ rating }) => {

    const renderProgress = () => {
        if (isNaN(rating))
            return 0
        else
            return 125 - (125 * rating) / 100
    }

    return (
        <div className="percent">
            <svg>
                <circle cx="20" cy="20" r="20" />
                <circle cx="20" cy="20" r="20" style={{ strokeDashoffset: renderProgress() }} />
            </svg>
            <div className="number">
                <h2>{isNaN(rating) ? 0 : rating}</h2>
            </div>
        </div>
    )
}

export default CircularProgressBar
