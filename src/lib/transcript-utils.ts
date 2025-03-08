import { TranscriptSegment } from '@/components/VideoTranscript';

// YouTube video ID extraction
export const extractYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Function to fetch transcript from a YouTube video
// This is a mock implementation as actual YouTube transcript extraction
// requires either using YouTube's API with proper authentication or
// a third-party service
export const fetchYouTubeTranscript = async (videoId: string): Promise<TranscriptSegment[]> => {
  try {
    // In a real implementation, you would make an API call to a service that provides transcripts
    // For example:
    // const response = await fetch(`https://api.example.com/youtube/transcript/${videoId}`);
    // if (!response.ok) throw new Error('Failed to fetch transcript');
    // const data = await response.json();
    // return data.transcript;
    
    // For now, we'll simulate a delay and return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockTranscript());
      }, 1000);
    });
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};

// Function to generate mock transcript data for demonstration
const generateMockTranscript = (): TranscriptSegment[] => {
  const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
  
  const sentences = lorem.split('. ').filter(s => s.trim().length > 0);
  const segments: TranscriptSegment[] = [];
  
  let currentTime = 0;
  for (let i = 0; i < 30; i++) {
    const sentenceIndex = i % sentences.length;
    const sentence = sentences[sentenceIndex] + '.';
    const duration = 5 + Math.random() * 10; // Random duration between 5-15 seconds
    
    segments.push({
      id: `segment-${i}`,
      start: currentTime,
      end: currentTime + duration,
      text: sentence
    });
    
    currentTime += duration;
  }
  
  return segments;
};

// In a real application, you might want to add more functions for different video platforms
// For example:
// export const fetchVimeoTranscript = async (videoId: string): Promise<TranscriptSegment[]> => { ... }