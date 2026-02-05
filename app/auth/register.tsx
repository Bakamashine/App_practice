import { SubmitEvent, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import auth, { RegisterError } from "../../api/auth";
import ShowErrors from "../../components/showErrors";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<RegisterError>();

  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await auth.Register(name, email, password);
    if (response) {
      setErrors(response);
    }
  };

  return (
    <div className="form-component">
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
    </div>
  );
};

export default Register;
