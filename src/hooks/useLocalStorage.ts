import { useState, useEffect } from 'react';
import type { SavedTranscript } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

export const useLocalStorage = () => {
  const [savedTranscripts, setSavedTranscripts] = useState<SavedTranscript[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSCRIPTS);
    if (stored) {
      try {
        setSavedTranscripts(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored transcripts:', error);
        localStorage.removeItem(STORAGE_KEYS.TRANSCRIPTS);
      }
    }
  }, []);

  const saveTranscript = (transcript: SavedTranscript) => {
    const updated = [...savedTranscripts, transcript];
    setSavedTranscripts(updated);
    localStorage.setItem(STORAGE_KEYS.TRANSCRIPTS, JSON.stringify(updated));
  };

  const deleteTranscript = (id: string) => {
    const updated = savedTranscripts.filter(t => t.id !== id);
    setSavedTranscripts(updated);
    localStorage.setItem(STORAGE_KEYS.TRANSCRIPTS, JSON.stringify(updated));
  };

  const editTranscriptTitle = (id: string, newTitle: string) => {
    const updated = savedTranscripts.map(t => 
      t.id === id ? { ...t, title: newTitle } : t
    );
    setSavedTranscripts(updated);
    localStorage.setItem(STORAGE_KEYS.TRANSCRIPTS, JSON.stringify(updated));
  };

  return {
    savedTranscripts,
    saveTranscript,
    deleteTranscript,
    editTranscriptTitle
  };
};