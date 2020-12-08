import React from 'react';
import './peopleCard.css';

const PeopleCard = ({ name, role, photo }) => {
    return (
        <div className="card">
            <div className="card__photo">
                <img src={photo} />
            </div>
            <div className="card__info">
                <h4>{name}</h4>
                <span>{role}</span>
            </div>
        </div>
    )
}

export default PeopleCard
