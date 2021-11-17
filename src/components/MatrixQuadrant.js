import { Col } from "react-bootstrap";
import { icon_img_base_url } from "../data/baseUrls";
import IconMatrix from "./IconMatrix";

export default function MatrixQuadrant(props) {
  return (
    <Col id={"matrix__quadrant__" + props.quad_idx}>
      <p> Matrix Quadrant {props.quad_idx}</p>
      {props.data.map((indivData, i) => (
        <IconMatrix
          name={indivData.name}
          location={indivData.location}
          img_src={icon_img_base_url + indivData.img_src}
          blurb={indivData.blurb}
          key={i}
        />
      ))}
    </Col>
  );
}
