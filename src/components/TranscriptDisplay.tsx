import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { TranscriptSegment } from '../types';
import { DownloadButton } from './DownloadButton';

interface TranscriptDisplayProps {
  segments: TranscriptSegment[];
  isProcessing?: boolean;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ 
  segments,
  isProcessing = false
}) => {
  const transcriptText = segments.map(segment => segment.text).join('\n\n');

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">
            Current Transcript
          </h3>
          {isProcessing && (
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          )}
        </div>
        {segments.length > 0 && (
          <div className="w-full sm:w-auto">
            <DownloadButton 
              text={transcriptText} 
              fileName={`transcript-${new Date().toISOString().split('T')[0]}`}
            />
          </div>
        )}
      </div>
      <div className="h-[calc(100%-4rem)] p-4 md:p-6 overflow-y-auto">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.timestamp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              {new Date(segment.timestamp).toLocaleTimeString()}
            </p>
            <p className="text-sm md:text-base text-gray-800 dark:text-gray-200 mt-1">
              {segment.text}
            </p>
          </motion.div>
        ))}
        {segments.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center italic">
              Your transcript will appear here...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};