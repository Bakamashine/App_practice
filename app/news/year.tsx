import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import news, { NewsItem, NewsPag } from "../../api/news";
import NewsCard from "../../components/news/newsCard";
import NotFound from "../../components/notfound";

export default function NewsYear() {
  const [newsByYear, setNews] = useState<NewsPag>();

  const params = useParams();
  const year = params.year;
  
  const fetchData = async () => {
    if (year) {
      const response = await news.getByYear(year);
      if (response.results.length > 0)
        setNews(response);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Year: ", params.year);
  }, [params.year]);

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
        </>
      ) : (
        // <p>Новости за данный год отсуствует</p>
        <NotFound fullText="Новостей за данный год не найдено" />
      )}
    </div>
  );
}
