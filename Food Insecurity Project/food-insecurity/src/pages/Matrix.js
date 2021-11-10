import { Col, Container, Row } from "react-bootstrap";
import MatrixQuadrant from "../components/MatrixQuadrant";
import "../styles/matrix.css";
import "../styles/utility.css";
import icon_data from "../data/iconInfo.json";

export default function Matrix() {
  let quad_1_data = [];
  let quad_2_data = [];
  let quad_3_data = [];
  let quad_4_data = [];
  let quads_data = [quad_1_data, quad_2_data, quad_3_data, quad_4_data];

  icon_data.forEach((data) => {
    let quad = quads_data[data.quad_idx];
    quad.push(data);
  });

  return (
    <div className="min-vh-100" id="matrix__container">
      <div className="vline"> </div>

      <Container fluid className="min-vh-100">
        <Row className="min-vh-10 bottom__align">
          <p id="bottom__align__content"> My condition is chronic </p>
        </Row>

        <Row className="min-vh-40">
          <MatrixQuadrant data={quad_2_data} quad_idx={2} />
          <MatrixQuadrant data={quad_1_data} quad_idx={1} />
        </Row>
        <Row>
          <Col>
            <p>I can solve it myself </p>{" "}
          </Col>
          <Col xs={10}>
            <hr></hr>
          </Col>
          <Col>
            <p> I need help</p>{" "}
          </Col>
        </Row>
        <Row className="min-vh-40">
          <MatrixQuadrant data={quad_3_data} quad_idx={3} />{" "}
          <MatrixQuadrant data={quad_4_data} quad_idx={4} />{" "}
        </Row>
        <Row className="min-vh-10">
          <p> My condition is acute </p>
        </Row>
      </Container>
    </div>
  );
}
