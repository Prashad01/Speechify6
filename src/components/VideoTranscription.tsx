import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Youtube, FileVideo, Link2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { transcribeYouTubeVideo, transcribeVideoFile } from '../utils/videoTranscription';

interface VideoTranscriptionProps {
  onTranscriptGenerated: (transcript: string) => void;
}

export const VideoTranscription: React.FC<VideoTranscriptionProps> = ({ onTranscriptGenerated }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoType, setVideoType] = useState<'youtube' | 'file' | null>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError('');

    try {
      const transcript = await transcribeYouTubeVideo(url);
      if (transcript) {
        onTranscriptGenerated(transcript);
        setUrl('');
        setVideoType(null);
      }
    } catch (err) {
      console.error('Transcription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to transcribe video');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError('File size too large. Maximum size is 100MB.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const transcript = await transcribeVideoFile(file);
      if (transcript) {
        onTranscriptGenerated(transcript);
        setVideoType(null);
      }
      e.target.value = ''; // Reset file input
    } catch (err) {
      console.error('Transcription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to transcribe video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Video Transcription
        </h2>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setVideoType('youtube');
              setError('');
            }}
            className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
              videoType === 'youtube'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Youtube className="w-8 h-8 mb-2" />
            <span>YouTube URL</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setVideoType('file');
              setError('');
            }}
            className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
              videoType === 'file'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <FileVideo className="w-8 h-8 mb-2" />
            <span>Upload Video</span>
          </motion.button>
        </div>
      </div>

      {videoType === 'youtube' && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleUrlSubmit}
          className="space-y-4"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here"
              className="block w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Video must have captions enabled</span>
          </div>
          <Button
            type="submit"
            disabled={isLoading || !url}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transcribing...</span>
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                <span>Generate Transcript</span>
              </>
            )}
          </Button>
        </motion.form>
      )}

      {videoType === 'file' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <label className="block">
            <div className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="flex items-center space-x-2">
                <FileVideo className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Drop your video here, or browse
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Maximum file size: 100MB
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </label>
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
};