
import { Article } from "@/types/article";
import { BookOpenText, Calendar, Clock, ExternalLink, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface ArticleContentProps {
  article: Article;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        {article.coverImage && (
          <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg mb-8">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
        
        {article.source && (
          <div className="text-muted-foreground mb-2">
            From: {article.source}
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
          {article.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Published: {new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>Added: {formatDistanceToNow(new Date(article.addedAt), { addSuffix: true })}</span>
          </div>
          {article.readingTime && (
            <div className="flex items-center gap-1">
              <BookOpenText size={16} />
              <span>{article.readingTime} min read</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mb-8">
          {article.originalUrl && (
            <Button variant="outline" size="sm" className="gap-1" asChild>
              <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
                <span>Original</span>
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare size={16} />
            <span>Ask AI</span>
          </Button>
        </div>
      </div>
      
      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticleContent;
