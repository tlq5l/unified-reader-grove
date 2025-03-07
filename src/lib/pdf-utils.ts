import * as pdfjs from 'pdfjs-dist';

// Ensure the worker is properly set up
const pdfWorkerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

/**
 * Extract metadata from a PDF file
 */
export const extractPdfMetadata = async (pdfUrl: string): Promise<{
  title?: string;
  author?: string;
  numPages: number;
  keywords?: string;
  creationDate?: Date;
  creator?: string;
}> => {
  try {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    
    const metadata = await pdf.getMetadata();
    const numPages = pdf.numPages;
    
    let creationDate: Date | undefined;
    if (metadata.info?.CreationDate) {
      // PDF dates are typically in the format: D:YYYYMMDDHHmmSSOHH'mm'
      const dateString = metadata.info.CreationDate as string;
      try {
        if (dateString.startsWith('D:')) {
          const year = parseInt(dateString.slice(2, 6));
          const month = parseInt(dateString.slice(6, 8)) - 1; // JS months are 0-indexed
          const day = parseInt(dateString.slice(8, 10));
          creationDate = new Date(year, month, day);
        }
      } catch (error) {
        console.error('Error parsing PDF creation date:', error);
      }
    }
    
    return {
      title: metadata.info?.Title as string | undefined,
      author: metadata.info?.Author as string | undefined,
      numPages,
      keywords: metadata.info?.Keywords as string | undefined,
      creationDate,
      creator: metadata.info?.Creator as string | undefined,
    };
  } catch (error) {
    console.error('Error extracting PDF metadata:', error);
    throw error;
  }
};

/**
 * Extract the first page of a PDF as an image (thumbnail)
 */
export const extractPdfThumbnail = async (pdfUrl: string, scale = 0.5): Promise<string> => {
  try {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    
    // Get the first page
    const page = await pdf.getPage(1);
    
    // Create a canvas for rendering
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Could not create canvas context');
    }
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render the page to the canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    
    await page.render(renderContext).promise;
    
    // Convert the canvas to a data URL
    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (error) {
    console.error('Error extracting PDF thumbnail:', error);
    throw error;
  }
};

/**
 * Extract text content from a PDF (useful for search)
 */
export const extractPdfText = async (pdfUrl: string, pageNum = 1): Promise<string> => {
  try {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    
    // Ensure the page number is valid
    if (pageNum < 1 || pageNum > pdf.numPages) {
      throw new Error(`Invalid page number: ${pageNum}. PDF has ${pdf.numPages} pages.`);
    }
    
    // Get the specified page
    const page = await pdf.getPage(pageNum);
    
    // Extract text content
    const textContent = await page.getTextContent();
    
    // Concatenate the text items
    return textContent.items
      .map(item => 'str' in item ? item.str : '')
      .join(' ');
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw error;
  }
};