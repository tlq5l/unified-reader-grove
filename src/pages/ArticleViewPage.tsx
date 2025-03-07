
import { useParams, useNavigate } from "react-router-dom";
import { sampleArticles } from "@/data/articles";
import ArticleContent from "@/components/ArticleContent";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CornerDownLeft, Archive, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ArticleViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const article = sampleArticles.find(article => article.id === id);
  
  if (!article) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
        <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }
  
  const handleMoveToArchive = () => {
    toast({
      title: "Moved to Archive",
      description: "This article has been moved to your archive."
    });
  };
  
  const handleMoveToReadLater = () => {
    toast({
      title: "Moved to Read Later",
      description: "This article has been saved to your Read Later list."
    });
  };
  
  return (
    <div>
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="flex justify-between items-center py-3 px-4 max-w-5xl mx-auto">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1">
            <ChevronLeft size={16} />
            <span>Back</span>
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleMoveToReadLater} className="gap-1">
              <Clock size={16} />
              <span>Read Later</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleMoveToArchive} className="gap-1">
              <Archive size={16} />
              <span>Archive</span>
            </Button>
          </div>
        </div>
      </div>
      
      <ArticleContent article={article} />
    </div>
  );
};

export default ArticleViewPage;
