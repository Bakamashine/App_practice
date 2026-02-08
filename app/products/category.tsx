import { useEffect, useEffectEvent, useState } from "react";
import product, { CategoryPag } from "../../api/product";
import CategoryCard from "../../components/products/CategoryCard";
import Loader from "../../components/loader";
import NotFound from "../../components/notfound";
import PaginationComponent from "../../components/pagination";

export default function CategoryView() {
  const [data, setData] = useState<CategoryPag>();
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    try {
      const response = await product.GetCategories();
      if (response) {
        setData(response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (load) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-center">Категории</h1>
      {data?.results && data.results.length > 0 ? (
        <>
          {data?.results.map((item) => (
            <CategoryCard
              key={item.id}
              img={item.img}
              name={item.name}
              id={item.id}
            />
          ))}
          <div className="mt-3 flexCenter">
            <PaginationComponent current_page={page} data={data} />
          </div>
        </>
      ) : (
        <NotFound fullText="Категории не найдены" />
      )}
    </>
  );
}
