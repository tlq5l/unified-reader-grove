import React, { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download,
  Maximize,
  Search 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Need to specify the worker path for PDF.js
const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

interface PDFViewerProps {
  pdfUrl: string;
  initialPage?: number;
}

// Define a proper type for PDF metadata
interface PDFMetadata {
  info?: {
    Title?: string;
    Author?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
    Keywords?: string;
  };
  metadata?: Record<string, unknown>;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, initialPage = 1 }) => {
  const [pdf, setPdf] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageInputValue, setPageInputValue] = useState<string>(initialPage.toString());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [metadata, setMetadata] = useState<PDFMetadata | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the PDF document
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true);
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        
        // Extract metadata
        const metadataObj = await pdfDoc.getMetadata();
        setMetadata(metadataObj);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  // Render current page when it changes
  useEffect(() => {
    const renderPage = async () => {
      if (!pdf || !canvasRef.current) return;

      try {
        const page = await pdf.getPage(currentPage);
        
        const viewport = page.getViewport({ 
          scale: scale,
          rotation: rotation
        });
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!context) return;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
        
        // Update the page input field
        setPageInputValue(currentPage.toString());
      } catch (error) {
        console.error('Error rendering page:', error);
      }
    };

    renderPage();
  }, [pdf, currentPage, scale, rotation]);

  // Handle page navigation
  const goToPage = (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= numPages) {
      setCurrentPage(pageNum);
    }
  };

  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  
  // Handle page input change
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };
  
  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInputValue);
    if (!isNaN(pageNum)) {
      goToPage(pageNum);
    }
  };

  // Handle zoom controls
  const zoomIn = () => setScale(prevScale => Math.min(prevScale + 0.1, 3.0));
  const zoomOut = () => setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  
  // Handle rotation
  const rotateClockwise = () => setRotation(prevRotation => (prevRotation + 90) % 360);

  // Handle download
  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = "document.pdf";
      link.click();
    }
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  // Handle search (basic implementation)
  const handleSearch = async () => {
    if (!searchQuery || !pdf) return;
    
    // Real search implementation would involve using PDF.js findController
    // This is a placeholder for a more comprehensive search feature
    alert(`Search functionality for "${searchQuery}" would be implemented here`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading PDF...</div>;
  }

  return (
    <div ref={containerRef} className="pdf-viewer flex flex-col w-full">
      {/* PDF Metadata Display */}
      {metadata && (
        <div className="text-xs text-muted-foreground mb-2">
          {metadata.info?.Title && <div>Title: {metadata.info.Title}</div>}
          {metadata.info?.Author && <div>Author: {metadata.info.Author}</div>}
          {metadata.info?.Creator && <div>Creator: {metadata.info.Creator}</div>}
        </div>
      )}
      
      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4 justify-between items-center">
        <div className="flex gap-2 items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPreviousPage} 
            disabled={currentPage <= 1}
          >
            <ChevronLeft size={16} />
          </Button>
          
          <form onSubmit={handlePageInputSubmit} className="flex items-center">
            <Input
              className="w-16 h-8 text-center"
              value={pageInputValue}
              onChange={handlePageInputChange}
              aria-label="Page number"
            />
            <span className="mx-1 text-sm text-muted-foreground">/ {numPages}</span>
          </form>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextPage} 
            disabled={currentPage >= numPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" onClick={zoomOut} aria-label="Zoom out">
            <ZoomOut size={16} />
          </Button>
          <div className="w-20">
            <Slider
              defaultValue={[scale]}
              min={0.5}
              max={3}
              step={0.1}
              onValueChange={(values) => setScale(values[0])}
            />
          </div>
          <Button variant="outline" size="sm" onClick={zoomIn} aria-label="Zoom in">
            <ZoomIn size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={rotateClockwise} aria-label="Rotate">
            <RotateCw size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadPdf} aria-label="Download">
            <Download size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen} aria-label="Fullscreen">
            <Maximize size={16} />
          </Button>
        </div>
        
        <div className="flex gap-2 items-center">
          <Input
            className="w-40 h-8"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline" size="sm" onClick={handleSearch}>
            <Search size={16} />
          </Button>
        </div>
      </div>
      
      {/* PDF Renderer */}
      <Card className="overflow-auto max-h-[calc(100vh-16rem)]">
        <CardContent className="flex justify-center p-0">
          <canvas ref={canvasRef} className="border border-border" />
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFViewer;