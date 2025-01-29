import React from 'react';
import { motion } from 'framer-motion';
import { VideoTranscription } from '../components/VideoTranscription';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SavedTranscripts } from '../components/SavedTranscripts';
import { History } from 'lucide-react';

const TranscriptConverterPage = () => {
  const { savedTranscripts, saveTranscript, deleteTranscript, editTranscriptTitle } = useLocalStorage();

  const handleTranscriptGenerated = (transcriptText: string) => {
    saveTranscript({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      segments: [{
        text: transcriptText,
        timestamp: Date.now(),
        type: 'paragraph'
      }],
      title: `Video Transcript ${new Date().toLocaleDateString()}`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          YouTube Transcript Converter
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Convert YouTube videos into text transcripts instantly
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VideoTranscription onTranscriptGenerated={handleTranscriptGenerated} />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <History className="w-6 h-6 text-green-500 dark:text-green-400" />
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Saved Transcripts
            </h2>
          </div>
          <SavedTranscripts 
            transcripts={savedTranscripts}
            onDelete={deleteTranscript}
            onEditTitle={editTranscriptTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default TranscriptConverterPage;