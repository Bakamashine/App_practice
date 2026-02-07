import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Paginate from "../helper/paginate";
import React from "react";

interface PaginationComponentProps {
  data: Paginate;
  current_page: number;
}

export default function PaginationComponent({
  current_page,
  data,
}: PaginationComponentProps) {
  const navigate = useNavigate();

  function next() {
    navigate(`?page=${current_page + 1}`);
  }

  function back() {
    navigate(`?page=${current_page - 1}`);
  }

  function last() {
    navigate(`?page=${data.total_pages}`);
  }

  function first() {
    navigate(`?page=${1}`);
  }

  function moveTo(page: number) {
    navigate(`?page=${page}`);
  }

  return (
    <Pagination>
      {current_page !== 1 && (
        <>
          <Pagination.First onClick={first} />
          <Pagination.Prev onClick={back} />
        </>
      )}

      {Array.from(Array(data.total_pages + 1).keys()).map((e) => (
        <React.Fragment key={e}>
          {e !== 0 && (
            <Pagination.Item
              key={e}
              active={e === current_page}
              onClick={() => moveTo(e)}
            >
              {e}
            </Pagination.Item>
          )}
        </React.Fragment>
      ))}
      {data.total_pages !== current_page && (
        <>
          <Pagination.Next onClick={next} />
          <Pagination.Last onClick={last} />
        </>
      )}
    </Pagination>
  );
}
