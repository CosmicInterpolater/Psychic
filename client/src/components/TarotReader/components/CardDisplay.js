// components/CardDisplay.js
import React from 'react';
import TarotCard from './TarotCard';

const CardDisplay = ({
    spreadTypes,
    selectedSpread,
    drawnCards,
    showInterpretation,
    onResetReading,
    onGetInterpretation
}) => {
    const getGridClass = () => {
        if (drawnCards.length === 1) return 'grid-cols-1 max-w-sm mx-auto';
        if (drawnCards.length === 3) return 'grid-cols-1 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    };

    // SVG/absolute layouts for Lotus and Celtic Cross
    const renderLotusSpread = () => {
        // Center + 6 around (flower pattern)
        const positions = [
            { x: 250, y: 250 }, // center
            { x: 250, y: 40 },  // top
            { x: 420, y: 140 }, // top-right
            { x: 370, y: 420 }, // bottom-right
            { x: 130, y: 420 }, // bottom-left
            { x: 80, y: 140 },  // top-left
            { x: 250, y: 460 }  // bottom
        ];
        return (
            <svg width={700} height={700} style={{ display: 'block', margin: '0 auto' }}>
                {drawnCards.map((card, i) => (
                    <foreignObject key={i} x={positions[i].x} y={positions[i].y} width={120} height={170}>
                        <div style={{ width: 120, height: 170, background: 'linear-gradient(to bottom, #fffde4, #fff9b2)', borderRadius: '16px', boxShadow: '0 2px 8px #0002', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ transform: 'scale(0.6)', transformOrigin: 'center', width: '120px', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TarotCard card={card} position={card.spreadName || card.position} />
                            </div>
                        </div>
                    </foreignObject>
                ))}
            </svg>
        );
    };

    const renderCelticCross = () => {
        // Cross (1-6) and vertical line (7-10)
        const positions = [
            { x: 220, y: 220 }, // 1 center
            { x: 220, y: 60 },  // 2 above
            { x: 60, y: 220 },  // 3 left
            { x: 380, y: 220 }, // 4 right
            { x: 220, y: 340 }, // 5 below
            { x: 220, y: 460 }, // 6 far below
            { x: 520, y: 40 },  // 7 vertical right 1
            { x: 520, y: 120 }, // 8 vertical right 2
            { x: 520, y: 200 }, // 9 vertical right 3
            { x: 520, y: 280 }  // 10 vertical right 4
        ];
        return (
            <svg width={800} height={700} style={{ display: 'block', margin: '0 auto' }}>
                {drawnCards.map((card, i) => (
                    <foreignObject key={i} x={positions[i].x} y={positions[i].y} width={120} height={170}>
                        <div style={{ width: 120, height: 170, background: 'linear-gradient(to bottom, #fffde4, #fff9b2)', borderRadius: '16px', boxShadow: '0 2px 8px #0002', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ transform: 'scale(0.6)', transformOrigin: 'center', width: '120px', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <TarotCard card={card} position={card.spreadName || card.position} />
                            </div>
                        </div>
                    </foreignObject>
                ))}
            </svg>
        );
    };

    return (
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">
                    {spreadTypes[selectedSpread].name} Reading
                </h2>
                <button
                    onClick={onResetReading}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
                >
                    <span>↻</span>
                    New Reading
                </button>
            </div>

            {selectedSpread === 'seven' && drawnCards.length === 7 ? (
                renderLotusSpread()
            ) : selectedSpread === 'celtic' && drawnCards.length === 10 ? (
                renderCelticCross()
            ) : (
                <div className={`grid gap-6 ${getGridClass()}`}>
                    {drawnCards.map((card, index) => (
                        <TarotCard
                            key={index}
                            card={card}
                            position={card.position}
                        />
                    ))}
                </div>
            )}

            {!showInterpretation && (
                <div className="mt-8 text-center">
                    <button
                        onClick={onGetInterpretation}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                    >
                        Get Interpretation
                    </button>
                </div>
            )}
        </div>
    );
};

export default CardDisplay;
