import NewsApi, { NewsItem } from "../api/news";
import { useEffect, useState } from "react";
import Loader from "../components/loader";

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [load, setLoad] = useState(true);

  const getData = async () => {
    try {
      const response = await NewsApi.getData();

      if (response) {
        setNews(NewsApi.parseData(response));
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
        {news.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid black",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h2>{item.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
            <small>Дата: {new Date(item.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
