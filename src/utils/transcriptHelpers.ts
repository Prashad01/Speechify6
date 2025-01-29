import type { TranscriptSegment } from '../types';

export const combineTranscriptText = (segments: TranscriptSegment[]): string => {
  return segments.map(segment => segment.text).join('\n\n');
};

export const getSegmentCount = (segments: TranscriptSegment[]): string => {
  return `${segments.length} segment${segments.length === 1 ? '' : 's'}`;
};