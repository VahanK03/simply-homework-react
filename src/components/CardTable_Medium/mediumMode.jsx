import React from 'react';
import Card from '../Card/card';
import mediumMode_DB from '../../utils/mediumMode_DB';
import useGameLogic from '../../gameLogic';
import './mediumMode.css';

mediumMode_DB.sort(() => Math.random() - 0.5);

const MediumMode = () => {
    const { handleCardFlip, isCardFlipped, isCardMatched } = useGameLogic();

    return (
        <div className="card-table-medium">
           
            <div className="card-table-body-medium">
                {
                    
                mediumMode_DB.map((item, index) => (
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

export default MediumMode;