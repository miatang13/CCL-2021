import { Col } from "react-bootstrap";
import IconMatrix from "./IconMatrix";

export default function MatrixQuadrant(props) {
  const baseUrl = "/assets/img/matrixIcon/";

  return (
    <Col id={"matrix__quadrant__" + props.quad_idx}>
      <p> Matrix Quadrant {props.quad_idx}</p>
      {props.data.map((indivData, i) => (
        <IconMatrix
          name={indivData.name}
          location={indivData.location}
          img_src={baseUrl + indivData.img_src}
          blurb={indivData.blurb}
          key={i}
        />
      ))}
    </Col>
  );
}
