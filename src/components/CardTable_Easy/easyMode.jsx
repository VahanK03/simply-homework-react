import React from 'react';
import Card from '../Card/card';
import easyMode_DB from '../../utils/easyMode_DB';
import useGameLogic from '../../gameLogic';
import './easyMode.css';
import { useEffect } from 'react';

easyMode_DB.sort(() => Math.random() - 0.5);

const EasyMode = ({ onWin, setAttempts, setMatchedCards }) => {
    const { handleCardFlip, isCardFlipped, isCardMatched, matchedCards } = useGameLogic();

    useEffect(() => {
        setMatchedCards(matchedCards.length); 
        if (matchedCards.length === easyMode_DB.length) {
            onWin(); 
        }
    }, [matchedCards, onWin, setMatchedCards]);

    return (
        <div className="card-table-easy">
            <div className='card-table-body-easy'>
            {easyMode_DB.map((item, index) => (
                <Card
                    key={index}
                    index={index}
                    data={item}
                    handleCardFlip={(index, id) => {
                        setAttempts((prev) => prev + 1); // Increment attempts
                        handleCardFlip(index, id);
                    }}
                    isFlipped={isCardFlipped(index)}
                    isMatched={isCardMatched(index)}
                />
            ))}
            </div>
        </div>
    );
};

export default EasyMode;