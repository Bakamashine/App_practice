import { Button, Card } from "react-bootstrap";
import { CategoryItem } from "../../api/product";
import { useNavigate } from "react-router-dom";

interface ProductCardProps extends CategoryItem {}
export default function ProductCard({ img, name, id }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <Button variant="primary" onClick={() => navigate(`/product/${id}`)}>
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
}
