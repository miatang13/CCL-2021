import { Col, Container, Row } from "react-bootstrap";
import "../styles/matrix.css";
import "../styles/utility.css";
import icon_data from "../data/iconInfo.json";
import IconMatrix from "../components/IconMatrix";
import { icon_img_base_url, icon_img_format } from "../data/baseUrls";
import description_data from "../data/description.json";
import { useState } from "react";

export default function Matrix() {
  const num_cols = 8;
  const num_rows = 7;
  const horizontal_line_row_idx = 3;
  const [iconName, setName] = useState("");
  const [iconLocation, setLocation] = useState("");
  const [iconBlurb, setBlurb] = useState("");

  var matrixContent = [];
  for (let row = 0; row < num_rows; row++) {
    // middle horizontal line + descriptors
    if (row === horizontal_line_row_idx) {
      let jsxElem = (
        <Row className="min-vh-10">
          <Col>
            <p>I can solve it myself </p>{" "}
          </Col>
          <Col xs={10}>
            <hr id="x__axis"></hr>
          </Col>
          <Col>
            <p> I need help</p>{" "}
          </Col>
        </Row>
      );
      matrixContent.push(jsxElem);
    } else {
      // normal grid cells
      let columns = [];
      for (let col = 0; col < num_cols; col++) {
        let dataKey = row.toString() + "_" + col.toString();
        // has icon in this cell
        let data = icon_data.find(
          (d) => d.row_idx === row && d.col_idx === col
        );
        if (data) {
          let iconElem = (
            <IconMatrix
              name={data.first_name}
              img_src={icon_img_base_url + data.first_name + icon_img_format}
              key={dataKey}
              onMouseEnter={() => {
                setName(data.first_name);
                setLocation(data.location);
                setBlurb(data.blurb);
              }}
              onMouseLeave={() => {
                setName("");
                setLocation("");
                setBlurb("");
              }}
            />
          );
          columns.push(<Col> {iconElem}</Col>);
        } else {
          columns.push(<Col> </Col>);
        }
      }
      let jsxElem = <Row className="min-vh-grid-cell">{columns}</Row>;
      matrixContent.push(jsxElem);
    }
  }

  return (
    <div className="min-vh-100" id="matrix__container">
      {iconName === "" && (
        <div id="center__text__container">
          <p> {description_data.matrix.center_info}</p>
        </div>
      )}
      {iconName !== "" && (
        <div id="center__text__container">
          <span> {iconName} </span>
          <span> {iconLocation} </span>
          <p> {iconBlurb} </p>
        </div>
      )}
      <div className="vline" id="y__axis"></div>
      <Container fluid className="min-vh-100">
        <Row className="min-vh-10 bottom__align">
          <p id="bottom__align__content"> My condition is chronic </p>
        </Row>
        {matrixContent}
        <Row className="min-vh-10">
          <p> My condition is acute </p>
        </Row>
      </Container>
    </div>
  );
}
