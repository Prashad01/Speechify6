import type { WordAnalysis } from '../types';

export const analyzeText = (text: string): WordAnalysis[] => {
  const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  const wordCount: Record<string, number> = {};
  
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  return Object.entries(wordCount).map(([word, frequency]) => ({
    word,
    frequency,
    length: word.length
  })).sort((a, b) => b.frequency - a.frequency);
};