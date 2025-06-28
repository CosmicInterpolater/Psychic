import React from 'react'; 
const TarotCard = ({ card, position }) => {
    return (
        <div className="text-center">
            <div className={`card-container bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-lg p-6 mb-3 shadow-lg border-2 border-yellow-500 min-h-[200px] flex flex-col justify-center ${card.isReversed ? 'card-reversed' : ''}`}>
                <div>
                    <div className="text-2xl mb-2">
                        {card.suit === "major" ? "✨" : "🃏"}
                    </div>
                    <div className="font-bold text-gray-800 text-lg mb-2">{card.name}</div>
                    <div className="text-sm text-gray-700 mb-3">
                        {card.keywords.slice(0, 2).join(" • ")}
                    </div>
                    <div className={'card-image'}>
                        <img 
                            src={'/images/' + card.name.toLowerCase().replaceAll(' ', '') + '.jpeg'} 
                            alt={card.name} 
                            className="w-full" 
                        />
                    </div>
                </div>
            </div>
            <div className="text-white font-semibold">{position}</div>
            {card.isReversed && <div className="text-yellow-400 text-sm">Reversed</div>}
        </div>
    );
};
export default TarotCard;