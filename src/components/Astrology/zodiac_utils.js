// utils/zodiacUtils.js - Zodiac calculation utilities
export const getZodiacSign = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Zodiac date ranges
  const zodiacRanges = [
    { sign: 'capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'pisces', start: [2, 19], end: [3, 20] },
    { sign: 'aries', start: [3, 21], end: [4, 19] },
    { sign: 'taurus', start: [4, 20], end: [5, 20] },
    { sign: 'gemini', start: [5, 21], end: [6, 20] },
    { sign: 'cancer', start: [6, 21], end: [7, 22] },
    { sign: 'leo', start: [7, 23], end: [8, 22] },
    { sign: 'virgo', start: [8, 23], end: [9, 22] },
    { sign: 'libra', start: [9, 23], end: [10, 22] },
    { sign: 'scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'sagittarius', start: [11, 22], end: [12, 21] }
  ];

  for (const range of zodiacRanges) {
    const [startMonth, startDay] = range.start;
    const [endMonth, endDay] = range.end;

    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) {
        return range.sign;
      }
    } else {
      // Handle year-end wrap (like Capricorn)
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return range.sign;
      }
    }
  }

  return 'aries'; // Default fallback
};

export const getDateRange = (sign) => {
  const ranges = {
    aries: 'March 21 - April 19',
    taurus: 'April 20 - May 20',
    gemini: 'May 21 - June 20',
    cancer: 'June 21 - July 22',
    leo: 'July 23 - August 22',
    virgo: 'August 23 - September 22',
    libra: 'September 23 - October 22',
    scorpio: 'October 23 - November 21',
    sagittarius: 'November 22 - December 21',
    capricorn: 'December 22 - January 19',
    aquarius: 'January 20 - February 18',
    pisces: 'February 19 - March 20'
  };
  return ranges[sign] || 'Unknown';
};

export const getZodiacEmoji = (sign) => {
  const emojis = {
    aries: '♈',
    taurus: '♉',
    gemini: '♊',
    cancer: '♋',
    leo: '♌',
    virgo: '♍',
    libra: '♎',
    scorpio: '♏',
    sagittarius: '♐',
    capricorn: '♑',
    aquarius: '♒',
    pisces: '♓'
  };
  return emojis[sign] || '⭐';
};