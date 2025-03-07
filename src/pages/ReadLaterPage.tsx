
import ArticleList from "@/components/ArticleList";
import { sampleArticles } from "@/data/articles";

const ReadLaterPage = () => {
  const laterArticles = sampleArticles.filter(article => article.status === 'later');
  
  return (
    <ArticleList 
      articles={laterArticles} 
      title="Read Later" 
      description="Content you've saved to read in the future"
    />
  );
};

export default ReadLaterPage;
