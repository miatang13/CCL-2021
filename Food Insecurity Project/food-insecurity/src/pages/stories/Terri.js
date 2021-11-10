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
    document.addEventListener("mousemove", function (e) {
      // if mouse start moving add class moving
      // it will show the circle with opacity transition
      setMoving(true);
      // get the mouse position minus 160px to center the circle
      mouseX.current = e.pageX - 160;
      mouseY.current = e.pageY - 160;
      // if mouse stop moving clear timer and call mouseStopped function
      clearTimeout(timer.current);
      timer.current = setTimeout(mouseStopped, 3000);
    });

    // set the momentum with setInterval function
    var loop = setInterval(function () {
      // change 12 to alter damping higher is slower
      xp.current += (mouseX.current - xp.current) / 6;
      yp.current += (mouseY.current - yp.current) / 6;
      circleRef.current.style.left = xp.current + "px";
      circleRef.current.style.top = yp.current + "px";
    }, 30);
  });

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
