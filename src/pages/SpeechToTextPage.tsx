import React from 'react';
import { motion } from 'framer-motion';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { TranscriptDisplay } from '../components/TranscriptDisplay';
import { SavedTranscripts } from '../components/SavedTranscripts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SaveTranscriptButton } from '../components/SaveTranscriptButton';
import { Button } from '../components/ui/Button';
import { Mic, MicOff, History } from 'lucide-react';

const SpeechToTextPage = () => {
  const { isListening, transcript, error, startListening, stopListening } = useSpeechRecognition();
  const { savedTranscripts, saveTranscript, deleteTranscript, editTranscriptTitle } = useLocalStorage();

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSaveTranscript = () => {
    if (transcript.length > 0) {
      saveTranscript({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        segments: transcript,
        title: `Transcript ${new Date().toLocaleDateString()}`
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Speech to Text Generator
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Start speaking and watch your words transform into text
        </p>
      </motion.div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              variant={isListening ? 'danger' : 'primary'}
              icon={isListening ? MicOff : Mic}
              onClick={handleToggleListening}
              className="w-full sm:w-auto text-base"
            >
              {isListening ? 'Stop Recording' : 'Start Recording'}
            </Button>

            <SaveTranscriptButton
              transcript={transcript}
              onSave={handleSaveTranscript}
              disabled={isListening}
            />
          </div>

          <TranscriptDisplay segments={transcript} />
        </div>

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

export default SpeechToTextPage;