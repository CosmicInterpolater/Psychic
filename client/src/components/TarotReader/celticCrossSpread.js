// celticCrossSpread.js
// Returns the 10-card Celtic Cross spread configuration and positions

export function getCelticCrossPositions() {
  return [
    { position: '1', name: 'Present' },
    { position: '2', name: 'Challenge' },
    { position: '3', name: 'Past' },
    { position: '4', name: 'Future' },
    { position: '5', name: 'Above' },
    { position: '6', name: 'Below' },
    { position: '7', name: 'Advice' },
    { position: '8', name: 'External Influences' },
    { position: '9', name: 'Hopes and Fears' },
    { position: '10', name: 'Outcome' }
  ];
}

export function arrangeCelticCross(cards) {
  const positions = getCelticCrossPositions();
  return cards.slice(0, 10).map((card, i) => ({
    ...card,
    spreadPosition: positions[i].position,
    spreadName: positions[i].name
  }));
}
