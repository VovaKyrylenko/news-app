import { NewsGrid } from "@/components/news/news-list";
import { getNews } from "@/actions/get-news";
import { Pagination } from "@/components/pagination";
import { Container } from "@/components/container";
import { SearchInput } from "@/components/search-input";
import { SearchParams } from "@/types/search-params";

interface HomeProps {
  searchParams: SearchParams;
}

export default async function Home({
  searchParams: { currentPage, search },
}: HomeProps) {
  const currentPageNumber = Number(currentPage ?? 1);
  const pageSize = 10;
  const result = await getNews(currentPageNumber, pageSize, search);

  if (!result.success) {
    return (
      <p className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        Nothing here
      </p>
    );
  }

  const data = result.data;
  const totalPages = Math.ceil(data.totalNewsCount / pageSize);

  return (
    <Container>
      <SearchInput />
      {data.news.length > 0 ? (
        <>
          <NewsGrid news={data.news} />
          <Pagination totalPages={totalPages} currentPage={currentPageNumber} />
        </>
      ) : (
        <p className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
          Nothing here
        </p>
      )}
    </Container>
  );
}
