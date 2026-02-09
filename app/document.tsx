import { useEffect, useState } from "react";
import documentClass, { DocumentItem } from "../api/documentClass";
import NotFound from "../components/notfound";
import OpenBrowser from "./openOnBrowser";
import { Link } from "react-router-dom";
import { PaginateWithGeneric } from "../helper/paginate";
import { Pagination } from "react-bootstrap";
import PaginationComponent from "../components/pagination";
export default function DocumentView() {
  const [doc, setDoc] = useState<PaginateWithGeneric<DocumentItem>>();
  const [page, setPage] = useState(1)
  const fetchData = async () => {
    const response = await documentClass.getDocuments();
    setDoc(response);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="documents">
        <h1 className="text-center">Документы</h1>
      {doc && doc.results.length > 0 ? (
        <>
          {doc.results.map((item) => (
            <div className="document" key={item.id}>
              {/* <OpenBrowser title={item.title} url={item.file} /> */}
            <a className="link" onClick={() => documentClass.openDocument(item.file)}>
              {item.title}
            </a>
              {/* <a onClick={}>Open</a> */}
              <p>Описание: {item.text}</p>
            </div>
          ))}
          <div className="flexCenter mt-3">
            <PaginationComponent current_page={page} data={doc}  />
          </div>
        </>
      ) : (
        <NotFound text="Документы" />
      )}
    </div>
  );
}
