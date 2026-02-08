import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import product, { CategoryItem } from "../../api/product";
import Loader from "../../components/loader";
import DetailBorder from "../../components/DetailBorder";
import Api from "../../api/api";
import CategoryCard from "../../components/products/CategoryCard";
import ProductCard from "../../components/products/ProductCard";
import NotFound from "../../components/notfound";
import { Image } from "react-bootstrap";

export default function CategoryDetail() {
  const [data, setData] = useState<CategoryItem>();
  const [load, setLoad] = useState(true);
  const params = useParams();
  const category_id = params.id;
  const fetchData = async () => {
    try {
      if (category_id) {
        const response = await product.CategoryByID(category_id);
        if (response) {
          setData(product.getParseOneCategory(response));
        }
      }
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
    <>
      <h1 className="text-center">{data?.name}</h1>
      <div className="mb-3">
        <p>Изображение:</p>
        <Image src={data?.img} alt="title-image" />
      </div>
      <DetailBorder data={{ title: data?.name, content: data?.description }} />
      <h2 className="text-center">Все продукты</h2>
      {data?.products && data?.products.length > 0 ? (
        <>
          {data?.products?.map((item) => (
            <ProductCard
              img={item.img}
              name={item.title}
              key={item.id}
              id={item.id}
            />
          ))}
        </>
      ) : (
        <NotFound fullText="Продуктов не найдено" />
      )}
    </>
  );
}
