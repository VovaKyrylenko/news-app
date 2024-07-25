import { News } from "@prisma/client";
import { NewsCard } from "./news-card/news-card";

type NewsGridProps = {
  news: News[];
  isAdmin?: boolean;
};

export const NewsGrid = ({ news, isAdmin = false }: NewsGridProps) => {
  const filteredNews = isAdmin ? news : news.filter(({ deleted }) => !deleted);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredNews.map((newsItem) => (
        <NewsCard
          id={newsItem.id}
          key={newsItem.id}
          title={newsItem.title}
          description={newsItem.description}
          link={newsItem.link}
          imageUrl={newsItem.imageLink}
          pubDate={newsItem.pubDate}
          isAdmin={isAdmin}
          isDeleted={newsItem.deleted}
        />
      ))}
    </div>
  );
};
