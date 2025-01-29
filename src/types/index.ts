export interface TranscriptSegment {
  text: string;
  timestamp: number;
  type: 'point' | 'paragraph';
}

export interface SavedTranscript {
  id: string;
  date: string;
  segments: TranscriptSegment[];
  title?: string;
}

export interface TranscriptSection {
  type: 'point' | 'paragraph';
  segments: TranscriptSegment[];
}