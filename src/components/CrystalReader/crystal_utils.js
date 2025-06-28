// crystalUtils.js - Utility functions for crystal selection and analysis

export const analyzeQuestionAndSelectCrystal = (question, readingType, crystalDatabase) => {
  if (!question && readingType === 'daily') {
    return getRandomCrystals(crystalDatabase, 1)[0];
  }

  const questionLower = question.toLowerCase();
  let bestMatch = null;
  let highestScore = 0;

  // Score each crystal based on keyword matching and reading type
  crystalDatabase.forEach(crystal => {
    let score = 0;
    
    // Check keywords in question
    crystal.keywords.forEach(keyword => {
      if (questionLower.includes(keyword)) {
        score += 3;
      }
    });
    
    // Check intentions match
    crystal.intentions.forEach(intention => {
      if (questionLower.includes(intention)) {
        score += 5;
      }
    });
    
    // Boost score based on reading type
    switch (readingType) {
      case 'love':
        if (crystal.chakra === 'Heart' || crystal.keywords.includes('love')) score += 10;
        break;
      case 'career':
        if (crystal.keywords.includes('success') || crystal.keywords.includes('confidence') || crystal.keywords.includes('abundance')) score += 10;
        break;
      case 'spiritual':
        if (crystal.chakra === 'Crown' || crystal.chakra === 'Third Eye' || crystal.keywords.includes('spiritual')) score += 10;
        break;
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = crystal;
    }
  });
  
  // If no strong match found, select based on reading type
  if (highestScore < 3) {
    const typeBasedSelection = {
      'love': crystalDatabase.find(c => c.name === 'Rose Quartz'),
      'career': crystalDatabase.find(c => c.name === 'Citrine'),
      'spiritual': crystalDatabase.find(c => c.name === 'Amethyst'),
      'daily': crystalDatabase.find(c => c.name === 'Clear Quartz')
    };
    bestMatch = typeBasedSelection[readingType] || crystalDatabase[0];
  }
  
  return bestMatch;
};

export const getRandomCrystals = (crystalDatabase, count = 9) => {
  const shuffled = [...crystalDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCrystalColor = (element) => {
  const colors = {
    Fire: 'from-red-500 to-orange-500',
    Water: 'from-blue-500 to-cyan-500',
    Earth: 'from-green-500 to-emerald-500',
    Air: 'from-purple-500 to-violet-500',
    All: 'from-white to-gray-300'
  };
  return colors[element] || colors.All;
};

export const validateQuestion = (question) => {
  if (!question || question.trim().length === 0) {
    return { isValid: false, message: 'Please enter a question for the reading.' };
  }
  
  if (question.trim().length < 5) {
    return { isValid: false, message: 'Please provide a more detailed question.' };
  }
  
  return { isValid: true, message: '' };
};

export const getCrystalsByElement = (crystalDatabase, element) => {
  return crystalDatabase.filter(crystal => crystal.element === element || crystal.element === 'All');
};

export const getCrystalsByChakra = (crystalDatabase, chakra) => {
  return crystalDatabase.filter(crystal => crystal.chakra === chakra || crystal.chakra === 'All');
};