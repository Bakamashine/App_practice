import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface PaginationComponentProps {
  total_page: number;
  data: any[];
  current_page: number;
}

export default function PaginationComponent({
  total_page,
  data,
  current_page,
}: PaginationComponentProps) {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />

      {Array.from(Array(total_page).keys()).map((e) => (
        <Pagination.Item key={e} active={e === current_page}>
          {e + 1}
        </Pagination.Item>
      ))}

      {/* <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item> */}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}
