import NewsApi, { NewsItem, NewsPag } from "../../api/news";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { Link, useParams, useSearchParams } from "react-router-dom";
import NewsCard from "../../components/news/newsCard";
import NotFound from "../../components/notfound";
import PaginationComponent from "../../components/pagination";

export default function NewsPage() {
  const [news, setNews] = useState<NewsPag>();
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("Current page: ", currentPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
      getData(parseInt(page));
    }
  }, [page]);

  const getData = async (cur_page?: number) => {
    try {
      const response = await NewsApi.getNewsPaginate(
        cur_page ? cur_page : currentPage,
      );

      if (response) {
        setNews(response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (load) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Новости</h1>
      <div>
        {news && news.results.length > 0 ? (
          <>
            {news.results.map((item) => (
              <NewsCard
                date={item.date}
                id={item.id}
                key={item.id}
                title={item.title}
              />
            ))}
            <div className="mt-3 flexCenter">
              <PaginationComponent
                data={news}
                current_page={currentPage}
              />
            </div>
          </>
        ) : (
          <NotFound text="Новостей" />
        )}
      </div>
    </div>
  );
}
