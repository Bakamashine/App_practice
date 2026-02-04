import { SubmitEvent, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import feedback, { FeedbackError } from "../api/feedback";
import ShowErrors from "../components/showErrors";
import CenterModal from "../components/centerModalWindow";

export default function SendFeedback() {
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [errors, setError] = useState<FeedbackError>();
  const [show, setShow] = useState(false);
  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await feedback.sendFeedback(phone, text);
    if (response) {
      setError(response);
    } else {
      setShow(true);
    }
  };
  return (
    <div className="form-component">
      <CenterModal
        callback={() => setShow(false)}
        show={show}
        centerText="Заявка была успешна отправлена"
      />
      <h1 className="text-center">Оставить заявку</h1>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ваш номер телефона</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Введите ваш номер телефона..."
          />
          <ShowErrors errors={errors?.phone} />
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingTextarea2" label="Ваше писание">
            <Form.Control
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ваше описание..."
              style={{ height: "100px" }}
            />
            <ShowErrors errors={errors?.text} />
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">
          Отправить заявку
        </Button>
      </Form>
    </div>
  );
}
