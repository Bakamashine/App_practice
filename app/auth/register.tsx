import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Register = () => {
  return (
    <div className="form-component">
        <h1 className="text-center">Регистрация</h1>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control type="text" placeholder="Имя..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ваш пароль</Form.Label>
          <Form.Control type="password" placeholder="Пароль..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control type="password" placeholder="Повторите пароль..." />
        </Form.Group>
        <Form.Group className="mb-3 flexCenter">
          <Button variant="dark">Регистрация</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Register;
