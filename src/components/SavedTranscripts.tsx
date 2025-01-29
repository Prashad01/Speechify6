import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Trash2, Edit2, Check, X } from 'lucide-react';
import type { SavedTranscript } from '../types';
import { DownloadButton } from './DownloadButton';

interface SavedTranscriptsProps {
  transcripts: SavedTranscript[];
  onDelete: (id: string) => void;
  onEditTitle: (id: string, newTitle: string) => void;
}

export const SavedTranscripts: React.FC<SavedTranscriptsProps> = ({
  transcripts,
  onDelete,
  onEditTitle,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleStartEdit = (transcript: SavedTranscript) => {
    setEditingId(transcript.id);
    setEditTitle(transcript.title || `Transcript ${new Date(transcript.date).toLocaleDateString()}`);
  };

  const handleSaveEdit = (id: string) => {
    onEditTitle(id, editTitle.trim());
    setEditingId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="h-full p-4 md:p-6 overflow-y-auto">
        {transcripts.map((transcript, index) => {
          const transcriptText = transcript.segments.map(segment => segment.text).join('\n\n');
          const isEditing = editingId === transcript.id;
          
          return (
            <motion.div
              key={transcript.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-3 md:p-4 border dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow mb-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Clock className="w-4 h-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                    {isEditing ? (
                      <div className="flex items-center gap-2 w-full max-w-md">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="flex-1 min-w-0 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(transcript.id)}
                          className="text-green-500 hover:text-green-600"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 truncate">
                        {transcript.title || `Transcript ${new Date(transcript.date).toLocaleDateString()}`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleStartEdit(transcript)}
                      className="p-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(transcript.id)}
                      className="p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {transcript.segments.length} segments
                  </p>
                  <DownloadButton
                    text={transcriptText}
                    fileName={transcript.title || `transcript-${new Date(transcript.date).toISOString().split('T')[0]}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
        {transcripts.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center italic">
              No saved transcripts yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};