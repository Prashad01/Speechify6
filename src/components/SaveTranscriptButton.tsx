import React from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import type { TranscriptSegment } from '../types';

interface SaveTranscriptButtonProps {
  transcript: TranscriptSegment[];
  onSave: () => void;
  disabled?: boolean;
}

export const SaveTranscriptButton: React.FC<SaveTranscriptButtonProps> = ({
  transcript,
  onSave,
  disabled = false
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSave}
      disabled={disabled || transcript.length === 0}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all
        ${disabled || transcript.length === 0
          ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          : 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'}
      `}
    >
      <Save className="w-4 h-4" />
      <span className="hidden sm:inline">Save Transcript</span>
      <span className="sm:hidden">Save</span>
    </motion.button>
  );
};