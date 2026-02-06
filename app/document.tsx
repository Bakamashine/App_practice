import { useEffect, useState } from "react";
import documentClass, { DocumentItem } from "../api/documentClass";
import NotFound from "../components/notfound";
import OpenBrowser from "./openOnBrowser";
export default function DocumentView() {
  const [doc, setDoc] = useState<DocumentItem[]>();
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
      {doc && doc.length > 0 ? (
        <>
          {doc.map((item) => (
            <div className="document" key={item.id}>
              {/* <OpenBrowser title={item.title} url={item.file} /> */}
              <a onClick={documentClass.openDocument}>Open</a>
              <p>Описание: {item.text}</p>
            </div>
          ))}
        </>
      ) : (
        <NotFound text="Документы" />
      )}
    </div>
  );
}
