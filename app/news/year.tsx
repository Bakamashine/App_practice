import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import news, { NewsItem, NewsPag } from "../../api/news";
import NewsCard from "../../components/news/newsCard";
import NotFound from "../../components/notfound";
import PaginationComponent from "../../components/pagination";
import Loader from "../../components/loader";

export default function NewsYear() {
  const [newsByYear, setNews] = useState<NewsPag>();
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(true);

  const params = useParams();
  const year = params.year;

  const fetchData = async () => {
    try {
      if (year) {
        const response = await news.getByYear(year);
        if (response) setNews(response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Year: ", params.year);
    return () => {
      setLoad(true)
    }
  }, [params.year]);

  if (load) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="text-center">Новости за {params?.year}</h1>

      {newsByYear?.results && newsByYear.results.length > 0 ? (
        <>
          {newsByYear.results.map((item) => (
            <NewsCard
              date={item.date}
              id={item.id}
              title={item.title}
              key={item.id}
              text={item.text}
            />
          ))}
          <div className="mt-3 flexCenter">
            <PaginationComponent data={newsByYear} current_page={page} />
          </div>
        </>
      ) : (
        // <p>Новости за данный год отсуствует</p>
        <NotFound fullText="Новостей за данный год не найдено" />
      )}
    </div>
  );
}
