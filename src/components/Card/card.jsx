import React, { useState } from 'react';
import './card.css';
import cardFront from "../../assets/cardFront.webp"

const Card = ({index, data, handleCardFlip, isFlipped, isMatched }) => {
    

    return (
        <div
        className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'blurred' : ''}`}
        onClick={() => handleCardFlip(index, data.id)}
        >
            <div className="content">
                <div className="front">
                    <img src={cardFront} alt="Card Front"  className='card-front'/>
                </div>
                <div className="back">
                    {data.imgPath && <img src={data.imgPath} alt={data.name} />}
                    <div className="card-name"><span>{data.name}</span></div>
                </div>
            </div>
        </div>
    );
};

export default Card;