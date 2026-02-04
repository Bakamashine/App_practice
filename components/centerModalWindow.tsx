import { Button, Modal } from "react-bootstrap";

interface CenterModalProps {
  callback: () => void;
  centerText?: string;
  title?: string;
  show: boolean
}

export default function CenterModal({
  callback,
  show,
  centerText = "Описание отсутствует",
  title = "Уведомление",
}: CenterModalProps) {
  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <p>{centerText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={callback}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
