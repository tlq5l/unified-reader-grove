import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Article } from "@/types/article";
import { formatDistanceToNow } from "date-fns";
import { FileText, Link as LinkIcon, Youtube, File } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const getContentTypeIcon = () => {
    switch (article.contentType) {
      case "article":
        return <FileText size={16} className="text-blue-500" />;
      case "video":
        return <Youtube size={16} className="text-red-500" />;
      case "pdf":
        return <File size={16} className="text-amber-500" />;
      case "newsletter":
        return <LinkIcon size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <Link to={`/articles/${article.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer border border-border/60">
        {article.coverImage && (
          <div className="w-full h-48 overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardContent className={`${article.coverImage ? 'pt-4' : 'pt-5'} pb-2`}>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            {getContentTypeIcon()}
            <span>{article.source || "Web"}</span>
            {article.contentType === 'pdf' && (
              <span className="text-xs bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-sm">
                PDF
              </span>
            )}
          </div>
          <h3 className="font-medium text-lg line-clamp-2 mb-2">{article.title}</h3>
          {article.description && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
              {article.description}
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-0 pb-4 text-xs text-muted-foreground">
          <div>Added {formatDistanceToNow(new Date(article.addedAt), { addSuffix: true })}</div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;