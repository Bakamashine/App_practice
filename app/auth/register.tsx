import { SubmitEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import auth, { RegisterError } from "../../api/auth";
import ShowErrors from "../../components/showErrors";
import { AuthContext } from "../root";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<RegisterError>();
  const {setAuth} = useContext(AuthContext)

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await auth.Register(name, email, password);
    if (response) {
      setErrors(response);
    } else {
      setAuth(true);

      navigate(from, {replace: true})
    }
  };

  return (
    <>
      <h1 className="text-center">Регистрация</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Необязательное поле..."
          />
          <ShowErrors errors={errors?.username} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ваша почта</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Ваша почта..."
          />
          <ShowErrors errors={errors?.email} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ваш пароль</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль..."
          />
          <ShowErrors errors={errors?.password} />
        </Form.Group>
        <Form.Group className="mb-3 flexCenter">
          <Button variant="dark" type="submit">
            Регистрация
          </Button>
        </Form.Group>
      </Form>
  </>
  );
};

export default Register;
