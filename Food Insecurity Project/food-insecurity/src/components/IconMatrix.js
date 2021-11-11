import { useRef } from "react";
import { Link } from "react-router-dom";

export default function IconMatrix(iconProp) {
  const storyBaseUrl = "/stories/";
  const target = useRef(null);
  return (
    <>
      <Link to={storyBaseUrl + iconProp.name}>
        <img
          ref={target}
          className="matrix__icon__img"
          src={iconProp.img_src}
          alt="icon"
          onMouseEnter={iconProp.onMouseEnter}
          onMouseLeave={iconProp.onMouseLeave}
        />
      </Link>
    </>
  );
}
