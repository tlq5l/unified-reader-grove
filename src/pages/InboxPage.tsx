
import ArticleList from "@/components/ArticleList";
import { sampleArticles } from "@/data/articles";

const InboxPage = () => {
  const inboxArticles = sampleArticles.filter(article => article.status === 'inbox');
  
  return (
    <ArticleList 
      articles={inboxArticles} 
      title="Inbox" 
      description="Content you've added to be processed"
    />
  );
};

export default InboxPage;
