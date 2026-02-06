import NewsApi, { NewsItem } from "../../api/news";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import NewsCard from "../../components/news/newsCard";

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
        {news.map((item) => (
          <NewsCard
            date={item.date}
            id={item.id}
            key={item.id}
            title={item.title}
          />
          // <div
          //   key={item.id}
          //   style={{
          //     border: "1px solid black",
          //     marginBottom: "10px",
          //     padding: "10px",
          //   }}
          // >
          //   <Link to={`/news/${item.id}`}><h2>{item.title}</h2></Link>
          //   {/* <div dangerouslySetInnerHTML={{ __html: item.text }}></div> */}
          //   <small>Дата: {new Date(item.date).toLocaleDateString()}</small>
          // </div>
        ))}
      </div>
    </div>
  );
}
