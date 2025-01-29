import { useState, useEffect, useCallback, useRef } from 'react';
import type { TranscriptSegment } from '../types';
import { enhanceTranscript } from '../utils/aiCorrection';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [error, setError] = useState<string>('');
  const [currentType, setCurrentType] = useState<'point' | 'paragraph'>('paragraph');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const temporaryTranscriptRef = useRef<string>('');
  const restartTimeoutRef = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    isMobileRef.current = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
      }
    };
  }, []);

  const processTranscriptSegment = async (text: string) => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    const newSegment: TranscriptSegment = {
      text: text.trim(),
      timestamp: Date.now(),
      type: currentType
    };

    try {
      const enhancedSegment = await enhanceTranscript(newSegment);
      setTranscript(prev => [...prev, enhancedSegment]);
    } catch (error) {
      console.error('Error processing transcript:', error);
      setTranscript(prev => [...prev, newSegment]);
    } finally {
      setIsProcessing(false);
    }
  };

  const setupRecognition = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    
    recognition.continuous = !isMobileRef.current;
    recognition.interimResults = !isMobileRef.current;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      temporaryTranscriptRef.current = '';
      setError('');
    };

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      
      if (result.isFinal) {
        const finalText = result[0].transcript.trim();
        if (finalText) {
          processTranscriptSegment(finalText);
        }
        temporaryTranscriptRef.current = '';
      } else if (!isMobileRef.current) {
        temporaryTranscriptRef.current = result[0].transcript;
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') return;
      
      console.error('Speech recognition error:', event.error);
      setError(event.error === 'network'
        ? 'Network error occurred. Please check your connection.'
        : 'An error occurred during speech recognition.');
        
      stopListening();
    };

    recognition.onend = () => {
      if (isListening && !isMobileRef.current) {
        if (restartTimeoutRef.current) {
          window.clearTimeout(restartTimeoutRef.current);
        }
        restartTimeoutRef.current = window.setTimeout(() => {
          if (isListening) {
            recognition.start();
          }
        }, 100);
      } else {
        setIsListening(false);
      }
    };

    return recognition;
  };

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) return;

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      if (isMobileRef.current) {
        setTranscript([]);
      }

      recognitionRef.current = setupRecognition();
      recognitionRef.current.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Failed to start speech recognition');
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (restartTimeoutRef.current) {
      window.clearTimeout(restartTimeoutRef.current);
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    error,
    currentType,
    isProcessing,
    startListening,
    stopListening,
    toggleType: () => setCurrentType(prev => prev === 'point' ? 'paragraph' : 'point')
  };
};