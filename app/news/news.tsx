import NewsApi, { NewsItem } from "../../api/news";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import NewsCard from "../../components/news/newsCard";
import NotFound from "../../components/notfound";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [load, setLoad] = useState(true);

  const getData = async () => {
    try {
      const response = await NewsApi.getData();

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
        {news && news.length > 0 ? (
          <>
            {news.map((item) => (
              <NewsCard
                date={item.date}
                id={item.id}
                key={item.id}
                title={item.title}
              />
            ))}
          </>
        ) : (
          <NotFound text="Новостей" />
        )}
      </div>
    </div>
  );
}
