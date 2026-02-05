import { Button } from "react-bootstrap";

export default function MainPage() {
  return (
    <>
      <h1 className="text-center">Main page</h1>
      <Button
        variant="dark"
        onClick={() => {
          throw new Error("Test error");
        }}
      >
        Make error
      </Button>
    </>
  );
}
