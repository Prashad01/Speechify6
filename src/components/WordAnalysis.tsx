import React from 'react';
import { motion } from 'framer-motion';
import type { WordAnalysis } from '../types';

interface WordAnalysisProps {
  analysis: WordAnalysis[];
}

export const WordAnalysisDisplay: React.FC<WordAnalysisProps> = ({ analysis }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Word Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analysis.map((word, index) => (
          <motion.div
            key={word.word}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"
          >
            <p className="font-medium text-lg text-gray-800 dark:text-gray-200">
              {word.word}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Frequency: {word.frequency} | Length: {word.length}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};