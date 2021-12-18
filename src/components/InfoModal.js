import { Modal, Button } from "react-bootstrap";
import "../styles/modal.css";

export default function InfoModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          About this project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Behind the Numbers began as a collaboration between the US Census
          Bureau and Carnegie Mellon University's School of Design in Fall 2021.
          Together our team—comprised of Jina Lee, Mia Tang, Matthew Guo, Jonah
          Conlin, and advised by Kyuha Shim—sought to use Census data to paint a
          more accurate picture of food security in the United States. While
          Census data undoubtedly demonstrates the scope and characteristics of
          hunger in the United States, it can obscure the human toll for each
          one of the 49 million households that are food insecure. Our project
          aims to surface these human stories, combining a data-driven national
          level picture of food security with first person accounts of hunger
          from everyday Americans.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
