import { useState } from 'react';

const useGameLogic = () => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]); 

    const handleCardFlip = (index, id) => {
        console.log(`Card flipped: index=${index}, id=${id}`);

        if (matchedCards.includes(index) || flippedCards.some((card) => card.index === index)) return;

        const newFlippedCards = [...flippedCards, { index, id }];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCard, secondCard] = newFlippedCards;

            if (firstCard.id === secondCard.id) {
                setMatchedCards([...matchedCards, firstCard.index, secondCard.index]);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000); 
            }
        }
    };

    const isCardFlipped = (index) => {
        return flippedCards.some((card) => card.index === index) || matchedCards.includes(index);
    };

    const isCardMatched = (index) => {
        return matchedCards.includes(index);
    };

    return { handleCardFlip, isCardFlipped, isCardMatched, matchedCards };
};

export default useGameLogic;