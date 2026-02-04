import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader__wrapper default-background">
      <Spinner animation="border" variant="dark" />
      </div>
    </div>
  );
}
