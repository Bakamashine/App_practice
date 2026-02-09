import { useEffect, useState } from "react";
import product, { ProductItem } from "../../api/product";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import DetailBorder from "../../components/DetailBorder";
import { Image } from "react-bootstrap";

export default function ProductDetail() {
  const [data, setData] = useState<ProductItem>();
  const [load, setLoad] = useState(true);
  const params = useParams();
  const id = params?.id;
  const fetchData = async () => {
    try {
      if (id) {
        const response = await product.ProductById(id);
        if (response) setData(product.parseProduct(response));
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
      <h1 className="text-center">{data?.title}</h1>
      <p>Изображение:</p>
      <div className="mb-3">
        <Image src={data?.img} alt="title-image" rounded />
      </div>
      <DetailBorder data={{ content: data?.description, title: data?.title }} />
      <Link className="link" to={`/category/${data?.category}`}>
        Назад к категории
      </Link>

      {data?.file && (
        <div className="mt-3">
          <Link className="btn btn-dark" to={`/product/threeD/${data.id}`}>
            Есть возможность посмотреть в 3d...
          </Link>
        </div>
      )}
    </>
  );
}
