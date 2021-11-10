import { Col, Container, Row } from "react-bootstrap";
import MatrixQuadrant from "../components/MatrixQuadrant";
import "../styles/matrix.css";

export default function Matrix() {
  return (
    <div>
      <Container>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>{" "}
      <p> Matrix page </p>
      <MatrixQuadrant />
      <MatrixQuadrant />
      <MatrixQuadrant />
      <MatrixQuadrant />
    </div>
  );
}
