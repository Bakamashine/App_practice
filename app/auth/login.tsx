import { SubmitEvent, SubmitEventHandler, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import auth from "../../api/auth";
import ShowError from "../../components/showError";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await auth.Login(name, password);
    if (response) {
      setError(response.detail);
    }
  };

  useEffect(() => {
    console.log(error)
  },[error])
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
    </div>
  );
};

export default Login;
