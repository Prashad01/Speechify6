import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, BookOpen, History, Video } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { TranscriptDisplay } from '../components/TranscriptDisplay';
import { SavedTranscripts } from '../components/SavedTranscripts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SaveTranscriptButton } from '../components/SaveTranscriptButton';
import { Button } from '../components/ui/Button';
import { VideoTranscription } from '../components/VideoTranscription';

const HomePage: React.FC = () => {
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

  const handleVideoTranscript = (transcriptText: string) => {
    // Convert the video transcript text into a segment format
    const videoSegment = {
      text: transcriptText,
      timestamp: Date.now(),
      type: 'paragraph' as const
    };
    
    saveTranscript({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      segments: [videoSegment],
      title: `Video Transcript ${new Date().toLocaleDateString()}`
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Speech to Text Assistant
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Your intelligent lecture companion
        </p>
      </motion.div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-500 dark:text-blue-400" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Current Transcript
              </h2>
            </div>
            <TranscriptDisplay segments={transcript} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 md:w-6 md:h-6 text-purple-500 dark:text-purple-400" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Video Transcription
              </h2>
            </div>
            <VideoTranscription onTranscriptGenerated={handleVideoTranscript} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 md:w-6 md:h-6 text-green-500 dark:text-green-400" />
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Saved Transcripts
              </h2>
            </div>
            <SavedTranscripts 
              transcripts={savedTranscripts}
              onDelete={deleteTranscript}
              onEditTitle={editTranscriptTitle}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;