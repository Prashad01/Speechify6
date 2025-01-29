import axios from 'axios';

export const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  if (patterns[1].test(url)) {
    return url;
  }

  return null;
};

export const transcribeYouTubeVideo = async (url: string): Promise<string> => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL. Please provide a valid YouTube video URL.');
  }

  try {
    // Using a CORS proxy to avoid CORS issues
    const corsProxy = 'https://corsproxy.io/?';
    const targetUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    const response = await axios.get(`${corsProxy}${encodeURIComponent(targetUrl)}`, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const htmlContent = response.data;
    
    // Extract captions data from the YouTube page
    const captionsMatch = htmlContent.match(/"captions":\s*({[^}]+})/);
    if (!captionsMatch) {
      throw new Error('No captions found for this video. Please ensure the video has English captions enabled.');
    }

    // Get the captions track URL
    const captionsData = JSON.parse(captionsMatch[1].replace(/\\"/g, '"'));
    const captionsUrl = captionsData?.playerCaptionsTracklistRenderer?.captionTracks?.[0]?.baseUrl;

    if (!captionsUrl) {
      throw new Error('No captions available for this video. Please try another video with captions enabled.');
    }

    // Fetch the actual captions
    const captionsResponse = await axios.get(`${corsProxy}${encodeURIComponent(captionsUrl)}`, {
      headers: {
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    if (!captionsResponse.data) {
      throw new Error('Failed to fetch captions. Please try again.');
    }

    // Parse the XML captions
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(captionsResponse.data, 'text/xml');
    const textNodes = xmlDoc.getElementsByTagName('text');
    
    let transcript = '';
    for (let i = 0; i < textNodes.length; i++) {
      const text = textNodes[i].textContent;
      if (text) {
        transcript += text.trim() + ' ';
      }
    }

    if (!transcript.trim()) {
      throw new Error('Failed to extract transcript. Please try another video.');
    }

    return transcript.trim();
  } catch (error) {
    console.error('YouTube transcription error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Video not found. Please check the URL and try again.');
      } else if (error.response?.status === 403) {
        throw new Error('Access to video captions is restricted. Please try another video.');
      }
    }
    
    // If it's an error we threw, pass it through
    if (error instanceof Error && error.message.includes('captions')) {
      throw error;
    }
    
    // Generic error
    throw new Error('Failed to fetch YouTube transcript. Please ensure the video exists and has captions enabled.');
  }
};

export const transcribeVideoFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const recognition = new (window as any).webkitSpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    let transcript = '';

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        transcript += result[0].transcript + ' ';
      }
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') {
        // Ignore no-speech errors as they're common during silence
        return;
      }
      reject(new Error(`Speech recognition error: ${event.error}`));
    };

    recognition.onend = () => {
      if (transcript.trim()) {
        resolve(transcript.trim());
      } else {
        reject(new Error('No speech detected in the video'));
      }
    };

    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = async () => {
      try {
        const stream = (video as any).captureStream();
        const source = audioContext.createMediaStreamSource(stream);
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);

        video.play();
        recognition.start();

        video.onended = () => {
          recognition.stop();
          URL.revokeObjectURL(video.src);
          audioContext.close();
        };
      } catch (error) {
        reject(new Error('Failed to process video file. Please ensure your browser supports video capture.'));
      }
    };

    video.onerror = () => {
      reject(new Error('Failed to load video file. Please ensure the file is a valid video format.'));
    };
  });
};