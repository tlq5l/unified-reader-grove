
import ArticleList from "@/components/ArticleList";
import { sampleArticles } from "@/data/articles";

const ArchivePage = () => {
  const archivedArticles = sampleArticles.filter(article => article.status === 'archive');
  
  return (
    <ArticleList 
      articles={archivedArticles} 
      title="Archive" 
      description="Content you've finished reading"
    />
  );
};

export default ArchivePage;
