import type { TranscriptSegment } from '../types';

export const enhanceTranscript = async (segment: TranscriptSegment): Promise<TranscriptSegment> => {
  // Simply return the original segment without AI correction
  return segment;
};