import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import news, { NewsItem } from "../../api/news";
import NewsCard from "../../components/news/newsCard";
import NotFound from "../../components/notfound";

export default function NewsYear() {
  const [newsByYear, setNews] = useState<NewsItem[]>([]);
  const params = useParams();

  const fetchData = async () => {
    const response = await news.getByYear(params.year);
    setNews(news.parseData(response));
  };

  useEffect(() => {
    fetchData();
    console.log("Year: ", params.year);
  }, [params.year]);

  return (
    <div>
      <h1 className="text-center">Новости за {params?.year}</h1>

      {newsByYear && newsByYear.length > 0 ? (
        <>
          {newsByYear.map((item) => (
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
