// Horoscope API wrapper
import { getAstrologyHoroscope } from './readingApi';

export async function getDailyHoroscope(sign, birthCity, birthState, birthTime) {
  return getAstrologyHoroscope(sign, 'daily', birthCity, birthState, birthTime);
}

export async function getWeeklyHoroscope(sign, birthCity, birthState, birthTime) {
  return getAstrologyHoroscope(sign, 'weekly', birthCity, birthState, birthTime);
}
