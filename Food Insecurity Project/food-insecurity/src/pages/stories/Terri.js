import Button from "@restart/ui/esm/Button";
import { Link } from "react-router-dom";
import { story_img_base_url } from "../../data/baseUrls";
import story_data from "../../data/storyInfo.json";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "../../styles/story.css";
import "../../styles/mouseMask.css";

export default function TerriPage() {
  /**
   * Data
   */
  const data = story_data["Terri"];
  const [contentText, setContentText] = useState(data.intro);

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
      <Link to="/matrix">
        {" "}
        <Button>Back to matrix </Button>
      </Link>
      <div class="wrapper">
        <div class="mask-bg-color full-size"></div>
        <div class="blend-multiply full-size">
          <img
            class="bg full-size"
            ref={bgRef}
            src={story_img_base_url + "test.png"}
            alt="background"
          />
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
        <div id="content__text">
          <h1> {data.name} </h1>
          <p> {contentText}</p>
        </div>
      </div>
    </div>
  );
}

//https://codepen.io/miatang13/pen/vYJamKW
