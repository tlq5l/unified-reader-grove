
import { useState } from "react";
import ArticleList from "@/components/ArticleList";
import { sampleArticles } from "@/data/articles";

const HomePage = () => {
  const recentArticles = sampleArticles
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 4);
  
  return (
    <div>
      <div className="bg-gradient-to-r from-bondwise-50 to-blue-50 dark:from-bondwise-950 dark:to-blue-950 py-12 px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to BondWise</h1>
          <p className="text-xl text-muted-foreground">
            Your personal reading assistant. Manage articles, create highlights, and organize your reading in one place.
          </p>
        </div>
      </div>
      
      <ArticleList 
        articles={recentArticles} 
        title="Recently Added" 
        description="Your most recently added content"
      />
    </div>
  );
};

export default HomePage;
