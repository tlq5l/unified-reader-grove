import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface TranscriptSegment {
  id: string;
  start: number; // Start time in seconds
  end: number;   // End time in seconds
  text: string;
}

interface VideoTranscriptProps {
  transcript: TranscriptSegment[];
  onSegmentClick?: (segment: TranscriptSegment) => void;
}

const VideoTranscript: React.FC<VideoTranscriptProps> = ({ transcript, onSegmentClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTranscript, setFilteredTranscript] = useState<TranscriptSegment[]>(transcript);
  
  // Filter transcript when search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTranscript(transcript);
      return;
    }
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = transcript.filter(segment => 
      segment.text.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredTranscript(filtered);
  }, [searchQuery, transcript]);
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Download transcript as text file
  const handleDownloadTranscript = () => {
    // Generate a simple text version of the transcript
    const transcriptText = transcript
      .map(segment => `[${formatTime(segment.start)}] ${segment.text}`)
      .join('\n\n');
    
    // Create a Blob containing the transcript text
    const blob = new Blob([transcriptText], { type: 'text/plain' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  // Highlight search term in text
  const highlightSearchTerm = (text: string) => {
    if (!searchQuery.trim()) {
      return text;
    }
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    
    return (
      <React.Fragment>
        {parts.map((part, i) => 
          part.toLowerCase() === searchQuery.toLowerCase() ? 
            <span key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</span> : 
            part
        )}
      </React.Fragment>
    );
  };
  
  return (
    <Card className="mt-4 max-w-3xl mx-auto">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Video Transcript</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadTranscript}
            className="gap-1"
          >
            <Download size={16} />
            <span>Download</span>
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search in transcript..."
              className="pl-8"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {filteredTranscript.length > 0 ? (
            <div className="space-y-2">
              {filteredTranscript.map(segment => (
                <div 
                  key={segment.id}
                  className="p-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                  onClick={() => onSegmentClick && onSegmentClick(segment)}
                >
                  <div className="text-xs text-muted-foreground font-mono mb-1">
                    {formatTime(segment.start)} - {formatTime(segment.end)}
                  </div>
                  <div className="text-sm">
                    {highlightSearchTerm(segment.text)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No transcript segments match your search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoTranscript;