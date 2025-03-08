import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  SkipBack, 
  SkipForward,
  FileText
} from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  hasTranscript?: boolean;
  onTranscriptToggle?: () => void;
}

// Helper function to extract YouTube video ID
const extractYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  title, 
  hasTranscript = false,
  onTranscriptToggle 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoId = extractYouTubeVideoId(videoUrl);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  
  // Use useRef for timeUpdateInterval to persist between renders
  const timeUpdateIntervalRef = useRef<number>();
  
  // Player event handlers
  const onPlayerReady = (event: YT.PlayerEvent) => {
    setDuration(event.target.getDuration());
  };
  
  // Memoize onPlayerStateChange with useCallback
  const onPlayerStateChange = useCallback((event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      
      // Define startTimeUpdate inside the callback
      const startTimeUpdate = () => {
        if (timeUpdateIntervalRef.current) {
          clearInterval(timeUpdateIntervalRef.current);
        }
        
        timeUpdateIntervalRef.current = window.setInterval(() => {
          if (playerRef.current) {
            setCurrentTime(playerRef.current.getCurrentTime());
          }
        }, 1000);
      };
      
      startTimeUpdate();
    } else if (event.data === YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      
      // Define stopTimeUpdate inside the callback
      const stopTimeUpdate = () => {
        if (timeUpdateIntervalRef.current) {
          clearInterval(timeUpdateIntervalRef.current);
          timeUpdateIntervalRef.current = undefined;
        }
      };
      
      stopTimeUpdate();
    } else if (event.data === YT.PlayerState.ENDED) {
      setIsPlaying(false);
      
      // Define stopTimeUpdate inside the callback if not already defined
      const stopTimeUpdate = () => {
        if (timeUpdateIntervalRef.current) {
          clearInterval(timeUpdateIntervalRef.current);
          timeUpdateIntervalRef.current = undefined;
        }
      };
      
      stopTimeUpdate();
    }
  }, []); // No external dependencies now
  
  // Load YouTube API
  useEffect(() => {
    // Create script element
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    
    // Get first script element in the document
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    
    // Setup YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      if (videoId) {
        playerRef.current = new YT.Player('youtube-player', {
          videoId: videoId,
          playerVars: {
            'playsinline': 1,
            'controls': 0,
            'rel': 0,
            'showinfo': 0,
            'fs': 0
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    };
    
    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      // Remove the global callback
      window.onYouTubeIframeAPIReady = function() {};
    };
  }, [videoId, onPlayerStateChange]);
  
  // Player controls
  const togglePlay = () => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };
  
  const toggleMute = () => {
    if (!playerRef.current) return;
    
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    if (!playerRef.current) return;
    
    const newVolume = value[0];
    playerRef.current.setVolume(newVolume);
    setVolume(newVolume);
    
    // If volume is changed to 0, mute; otherwise unmute if it's currently muted
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (!playerRef.current) return;
    
    const seekTime = value[0];
    playerRef.current.seekTo(seekTime, true);
    setCurrentTime(seekTime);
  };
  
  const skipBackward = () => {
    if (!playerRef.current) return;
    
    const newTime = Math.max(0, currentTime - 10);
    playerRef.current.seekTo(newTime, true);
  };
  
  const skipForward = () => {
    if (!playerRef.current) return;
    
    const newTime = Math.min(duration, currentTime + 10);
    playerRef.current.seekTo(newTime, true);
  };
  
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div ref={containerRef} className="video-player w-full max-w-3xl mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Video Title */}
      {title && (
        <div className="p-3 bg-background">
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
      )}
      
      {/* Video Container */}
      <div className="relative aspect-video">
        {videoId ? (
          <div id="youtube-player" className="w-full h-full"></div>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white">
            Invalid video URL
          </div>
        )}
      </div>
      
      {/* Video Controls */}
      <div className="p-3 bg-muted/40">
        {/* Progress Bar */}
        <div className="mb-2">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={1}
            onValueChange={handleSeek}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              aria-label="Skip back 10 seconds"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center ml-2 space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="w-24 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {hasTranscript && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onTranscriptToggle}
                aria-label="Toggle transcript"
              >
                <FileText className="h-5 w-5" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {}}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;