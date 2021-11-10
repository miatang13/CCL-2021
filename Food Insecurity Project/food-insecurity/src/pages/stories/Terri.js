import Button from "@restart/ui/esm/Button";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { header_img_base_url, icon_img_base_url } from "../../data/baseUrls";
import story_data from "../../data/storyInfo.json";
import "../../styles/story.css";
import "../../styles/mouseMask.css";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

export default function TerriPage() {
  const data = story_data["Terri"];
  /*
  return (
    <Container className="story__container">
      <div className="d-flex justify-content-center header__img__container">
        {" "}
        <img
          src={header_img_base_url + data.header_img_url}
          alt={data.name + "header image"}
          width="85%"
        ></img>
      </div>
      <Link to="/matrix">
        {" "}
        <Button>Back to matrix </Button>
      </Link>
      <div className="content__container">
        <Row>
          <Col xs={3}>
            <h2> Biography </h2>
            <img
              src={icon_img_base_url + data.icon_img_url}
              alt={data.name + "icon image"}
            />
          </Col>
          <Col>
            <h1> {data.name} </h1>
            <p>{data.intro}</p>{" "}
          </Col>
        </Row>
        <section></section>
        <section>
          <h2> Behind the numbers </h2>
          {data.content.map((cont, i) => {
            return (
              <div className="indiv__content__wrapper" key={i}>
                <p className="data__text"> {cont.data_content}</p>
                <p className="narrative_text"> {cont.narrative_content}</p>
              </div>
            );
          })}
        </section>
      </div>
    </Container>
  ); */

  var timer = useRef(0);
  var mouseX = useRef(0);
  var mouseY = useRef(0);
  var xp = useRef(0);
  var yp = useRef(0);
  var circleRef = useRef();
  const [isMoving, setMoving] = useState(false);

  function mouseStopped() {
    // if mouse stop moving remove class moving
    // it will hide the circle with opacity transition
    setMoving(false);
  }

  useEffect(() => {
    function onMouseMove(e) {
      setMoving(true);
      mouseX.current = e.pageX - 160;
      mouseY.current = e.pageY - 160;
      clearTimeout(timer.current);
      timer.current = setTimeout(mouseStopped, 3000);
    }

    document.addEventListener("mousemove", onMouseMove);

    // set the momentum with setInterval function
    const interval = setInterval(function () {
      const damp = 10;
      xp.current += (mouseX.current - xp.current) / damp;
      yp.current += (mouseY.current - yp.current) / damp;
      circleRef.current.style.left = xp.current + "px";
      circleRef.current.style.top = yp.current + "px";
    }, 30);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div class="wrapper full-size">
      <div class="mask-bg-color full-size"></div>
      <div class="blend-multiply full-size">
        <div class="animated-bg full-size"></div>
        <div class="blend-screen element-mask full-size">
          <span
            id="circle"
            className={classNames("circle-follow", { moving: isMoving })}
            ref={circleRef}
          ></span>
        </div>
      </div>
    </div>
  );
}

//https://codepen.io/miatang13/pen/vYJamKW
