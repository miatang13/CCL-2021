import { Col, Container, Row } from "react-bootstrap";
import "../styles/matrix.css";
import "../styles/utility.css";
import icon_data from "../data/iconInfo.json";
import IconMatrix from "../components/IconMatrix";
import { icon_img_base_url, icon_img_format } from "../data/baseUrls";
import description_data from "../data/description.json";
import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import classNames from "classnames";
import animationStyles from "../styles/transition.module.css";
import gsap from "gsap";

export default function Matrix() {
  /**
   * Animations
   */
  let iconRef = useRef([]);
  let xAxisRef = useRef();
  let yAxisRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    tl.to(
      xAxisRef.current,
      {
        opacity: "100%",
        width: "100%",
        duration: 0.5,
        ease: "power2.easeInOut",
      },
      0.3
    );
    tl.to(
      yAxisRef.current,
      {
        opacity: "100%",
        height: "80vh",
        duration: 0.5,
        ease: "power2.easeInOut",
      },
      0.5
    );
    tl.to(iconRef.current, {
      y: 0,
      x: 0,
      opacity: "100%",
      duration: 1.2,
      ease: "power2.easeInOut",
      stagger: {
        each: 0.1,
        ease: "power2.easeInOut",
      },
    });
  }, []);

  const num_cols = 8;
  const num_rows = 7;
  const horizontal_line_row_idx = 3;
  const [iconName, setName] = useState("");
  const [iconLocation, setLocation] = useState("");
  const [iconBlurb, setBlurb] = useState("");
  const [showIconInfo, setShowIconInfo] = useState(false);

  var matrixContent = [];
  for (let row = 0; row < num_rows; row++) {
    // middle horizontal line + descriptors
    if (row === horizontal_line_row_idx) {
      let jsxElem = (
        <Row className="min-vh-10">
          <Col>
            <p className="axis__label">I can solve it myself </p>
          </Col>
          <Col xs={10}>
            <hr
              ref={(r) => {
                xAxisRef.current = r;
              }}
              id="x__axis"
            ></hr>
          </Col>
          <Col>
            <p className="axis__label"> I need help</p>{" "}
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
                setShowIconInfo(true);
              }}
              onMouseLeave={() => {
                setName("");
                setLocation("");
                setBlurb("");
                setShowIconInfo(false);
              }}
            />
          );
          columns.push(
            <Col
              className="indiv__icon__wrapper"
              ref={(r) => {
                iconRef.current.push(r);
              }}
            >
              {" "}
              {iconElem}
            </Col>
          );
        } else {
          columns.push(<Col> </Col>);
        }
      }
      let jsxElem = <Row className="min-vh-grid-cell">{columns}</Row>;
      matrixContent.push(jsxElem);
    }
  }

  return (
    <div className="page__root">
      <div className="min-vh-100" id="matrix__container">
        <div
          className="vline"
          id="y__axis"
          ref={(r) => (yAxisRef.current = r)}
        ></div>

        <Container fluid className="min-vh-100">
          <Row className="min-vh-10 bottom__align">
            <p className="axis__label" id="bottom__align__content">
              My condition is chronic{" "}
            </p>
          </Row>
          {matrixContent}
          <Row className="min-vh-10">
            <p className="axis__label"> My condition is acute </p>
          </Row>
        </Container>
        <div className="fixed-center" id="center__text__container">
          {!showIconInfo && (
            <div
              className={classNames(
                animationStyles.animate,
                !showIconInfo && animationStyles.opacityAnimateShow
              )}
            >
              <span className="emph__text">
                {description_data.matrix.title}
              </span>
              <p className="center__blurb">
                {description_data.matrix.center_info}
              </p>
            </div>
          )}
          {showIconInfo && (
            <div
              className={classNames(
                animationStyles.animate,
                showIconInfo && animationStyles.opacityAnimateShow
              )}
            >
              <span className="emph__text"> {iconName} </span>
              <span className="emph__text"> {iconLocation} </span>
              <p className="center__blurb"> {iconBlurb} </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
