
export interface Article {
  id: string;
  title: string;
  description?: string;
  content: string;
  contentType: 'article' | 'pdf' | 'newsletter' | 'video';
  source?: string;
  originalUrl?: string;
  coverImage?: string;
  addedAt: string;
  publishedAt?: string;
  readingTime?: number;
  status: 'inbox' | 'later' | 'archive';
  highlights?: {
    id: string;
    text: string;
    position: string;
    note?: string;
    createdAt: string;
  }[];
}
