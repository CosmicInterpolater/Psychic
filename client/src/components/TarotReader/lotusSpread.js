// lotusSpread.js
// Returns the 7-card Lotus spread configuration and positions

export function getLotusSpreadPositions() {
  return [
    { position: '1', name: 'Root Cause' },
    { position: '2', name: 'Present Situation' },
    { position: '3', name: 'Hidden Influences' },
    { position: '4', name: 'Obstacles' },
    { position: '5', name: 'External Influences' },
    { position: '6', name: 'Advice' },
    { position: '7', name: 'Outcome' }
  ];
}

export function arrangeLotusSpread(cards) {
  const positions = getLotusSpreadPositions();
  return cards.slice(0, 7).map((card, i) => ({
    ...card,
    spreadPosition: positions[i].position,
    spreadName: positions[i].name
  }));
}
