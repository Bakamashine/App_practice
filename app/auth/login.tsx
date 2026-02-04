import {
  SubmitEvent,
  SubmitEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import auth from "../../api/auth";
import ShowError from "../../components/showError";
import { AuthContext } from "../renderer";
import { useLocation, useNavigate } from "react-router-dom";
import { debug } from "../../constants/debug";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await auth.Login(name, password);
    if (response) {
      setError(response.detail);
    } else {
      setAuth(true);
      navigate(from, {replace: true})
    }
  };

  return (
    <div className="form-component">
      <h1 className="text-center">Авторизация</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Имя..."
          />
          <ShowError message={error} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ваш пароль</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль..."
          />
        </Form.Group>
        <Form.Group className="mb-3 flexCenter">
          <Button variant="dark" type="submit">
            Авторизация
          </Button>
        </Form.Group>
      </Form>
    
      {debug && (
        <Button variant="dark" onClick={async (e) => {
          e.preventDefault()
          const response = await auth.Login("cutteban", "moredock1");
          if (!response) {
            setAuth(true);
            navigate(from, {replace: true})
          }
        }}>Login (debug)</Button>
      )}
    </div>
  );
};

export default Login;
