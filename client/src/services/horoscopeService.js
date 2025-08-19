// Horoscope API wrapper
import { getAstrologyHoroscope } from './readingApi';

export async function getDailyHoroscope(sign) {
  return getAstrologyHoroscope(sign, 'daily');
}

export async function getWeeklyHoroscope(sign) {
  return getAstrologyHoroscope(sign, 'weekly');
}
