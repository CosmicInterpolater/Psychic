// Tarot interpretation service
export async function getTarotInterpretation(spread) {
  const response = await fetch('http://localhost:8080/api/tarot/interpret', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ spread })
  });
  if (!response.ok) throw new Error('Failed to get tarot interpretation');
  return response.json();
}

// Astrology horoscope service
export async function getAstrologyHoroscope(sign, period) {
  const response = await fetch('http://localhost:8080/api/astrology/horoscope', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sign, period })
  });
  if (!response.ok) throw new Error('Failed to get horoscope');
  return response.json();
}
