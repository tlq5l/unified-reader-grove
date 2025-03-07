
import { useState } from "react";
import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";
import ContentFilter from "./ContentFilter";

interface ArticleListProps {
  articles: Article[];
  title: string;
  description?: string;
}

const ArticleList = ({ articles, title, description }: ArticleListProps) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [contentType, setContentType] = useState('all');
  
  const filteredArticles = articles
    .filter(article => contentType === 'all' || article.contentType === contentType)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'source') {
        return (a.source || '').localeCompare(b.source || '');
      }
      return 0;
    });

  if (articles.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && <p className="text-muted-foreground mb-8">{description}</p>}
        <div className="py-12 border rounded-lg bg-muted/30">
          <p className="text-muted-foreground">No articles in this category yet.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      
      <ContentFilter 
        view={view} 
        setView={setView} 
        sortBy={sortBy} 
        setSortBy={setSortBy}
        contentType={contentType}
        setContentType={setContentType}
      />
      
      <div className={view === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "flex flex-col gap-4"
      }>
        {filteredArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="py-12 border rounded-lg bg-muted/30 text-center">
          <p className="text-muted-foreground">No articles match the current filters.</p>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
