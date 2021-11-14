import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";
import { story_img_base_url, story_img_format } from "../data/baseUrls";
import story_data from "../data/storyInfo.json";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "../styles/story.css";
import "../styles/mouseMask.css";
import { Col, Container, Row } from "react-bootstrap";
import { getRandomInt } from "../utility/random";

export default function StoryPage({ match }) {
  const {
    params: { personName },
  } = match;

  const data = story_data[personName];
  const interactive_content = data.interactive_content;
  const [header, setHeader] = useState(personName);
  const [subheader, setSubheader] = useState(data.location);
  const [paragraph, setContentText] = useState(data.bio);
  const [hiddenNumbersJsx, setHiddenNumberJsx] = useState([]);

  /**
   * Data UI
   */

  const handleHoverOverNumber = (idx) => {
    setHeader(interactive_content[idx].data);
    setSubheader("BEHIND THE NUMBERS");
    setContentText(interactive_content[idx].story_blurb);
  };

  const handleLeaveNumber = () => {
    setHeader(personName);
    setSubheader(data.location);
    setContentText(data.bio);
  };

  useEffect(() => {
    let spansJsx = [];
    const maxCol = 6;
    spansJsx.push(<Row className="min-vh-story-number-cell"> </Row>); // for padding on top

    interactive_content.forEach((c, index) => {
      let elem = (
        <div
          className="hidden__num__wrapper"
          onMouseEnter={() => handleHoverOverNumber(index)}
          onMouseLeave={() => handleLeaveNumber()}
        >
          {c.number} %
        </div>
      );
      let colIdx = getRandomInt(maxCol);
      let columns = [];
      for (let i = 0; i < maxCol; i++) {
        if (colIdx === i) {
          columns.push(<Col> {elem} </Col>);
        } else {
          columns.push(<Col></Col>);
        }
      }
      let wrapper = (
        <Row className="min-vh-story-number-cell "> {columns} </Row>
      );
      spansJsx.push(wrapper);
      spansJsx.push(<Row className="min-vh-story-number-cell "> </Row>); // for padding on bottom
    });

    spansJsx.push(<Row className="min-vh-story-number-cell "> </Row>); // for padding on bottom
    console.log(spansJsx.length);
    let jsx = (
      <Container className="min-vh-100 min-vw-100"> {spansJsx} </Container>
    );
    setHiddenNumberJsx(jsx);
  }, []);

  /**
   * Interaction
   */
  const bgRef = useRef();
  const timer = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const xp = useRef(0);
  const yp = useRef(0);
  const circleRef = useRef();
  const [isMoving, setMoving] = useState(false);

  function mouseStopped() {
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
    <div>
      <div class="mask-wrapper">
        <div class="mask-bg-color full-size"></div>
        <div class="blend-multiply full-size">
          <img
            class="bg full-size"
            ref={bgRef}
            src={story_img_base_url + personName + story_img_format}
            alt="background"
          />
          <div class="blend-screen">{hiddenNumbersJsx}</div>

          <div class="blend-screen element-mask full-size">
            <span
              id="circle"
              className={classNames("circle-follow", { moving: isMoving })}
              ref={circleRef}
            ></span>
          </div>
        </div>
      </div>

      <div id="content__container">
        <h4> {header}</h4>
        <h4> {subheader}</h4>

        <span> {paragraph}</span>
      </div>

      <div class="navigation__wrapper">
        <Link to="/matrix">
          <Button>Return to matrix </Button>
        </Link>
      </div>
    </div>
  );
}
