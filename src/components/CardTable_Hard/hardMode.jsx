import React from 'react';
import Card from '../Card/card';
import hardMode_DB from '../../utils/hardMode_DB';
import useGameLogic from '../../gameLogic';
import './hardMode.css';

hardMode_DB.sort(() => Math.random() - 0.5);

const HardMode = () => {
    const { handleCardFlip, isCardFlipped, isCardMatched } = useGameLogic();

    return (
        <div className="card-table">
           
            <div className="card-table-body">
                {
                    
                hardMode_DB.map((item, index) => (
                    <Card
                        key={index}
                        index={index}
                        data={item}
                        handleCardFlip={() => handleCardFlip(index, item.id)} 
                        isFlipped={isCardFlipped(index)}
                        isMatched={isCardMatched(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HardMode;