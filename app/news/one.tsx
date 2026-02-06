import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import news, { NewsItem } from "../../api/news";
import Loader from "../../components/loader";
import NotFound from "../../components/notfound";

export default function OneNews() {
  const [load, setLoad] = useState(true);
  const [onenews, setNews] = useState<NewsItem>();
  const params = useParams();

  const fetchData = async () => {
    try {
      if (params.id) {
        const response = await news.getById(params.id);
        const parsedData = news.parseData([response]);
        setNews(parsedData[0]);
      } else throw new Error(`Params.id is undefined ${params.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);
  if (load) {
    return <Loader />;
  }
  return (
    <div>
      {onenews  ? (
        <div
          style={{
            border: "1px solid black",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h2>{onenews?.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: onenews?.text }}></div>
          <small>Дата: {new Date(onenews?.date).toLocaleDateString()}</small>
        </div>
      ) : (
        <NotFound text="Новость" any={false} />
      )}
    </div>
  );
}
