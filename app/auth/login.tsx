import {
  SubmitEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import auth, { LoginError, LoginInputError } from "../../api/auth";
import ShowError from "../../components/showError";
import { AuthContext } from "../root";
import { useLocation, useNavigate } from "react-router-dom";
import { debug } from "../../constants/debug";
import ShowErrors from "../../components/showErrors";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<LoginError | undefined | LoginInputError>(undefined);
  // const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  
  const setLoginError = (response: LoginError|LoginInputError) => {
    if ('detail' in response && response.detail) {
      setError(response);
    } else if ('username' in response || 'password' in response) {
      setError(response)
    }
  }

  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await auth.Login(name, password);
    if (response) {
      setLoginError(response)
    } else {
      setAuth(true);
      // setShow(true);
      navigate(from, {replace: true})
    }
  };

  useEffect(() => {
    console.log("Login Error useEffect: ", error)
  }, [error])

  return (
      <>
      {/* <CenterModal callback={() => setShow(false)} show={show} centerText={`Вы успешно авторизировались ${user.getName}`} /> */}
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
          <ShowError message={error?.detail} />
          <ShowErrors errors={error?.username} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ваш пароль</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль..."
          />
          <ShowErrors errors={error?.password} />
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
            // setShow(true)
            navigate(from, {replace: true})
          }
        }}>Login (debug)</Button>
      )}
  </>
  );
};

export default Login;
