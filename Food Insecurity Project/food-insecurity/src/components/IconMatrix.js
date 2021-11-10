import Button from "@restart/ui/esm/Button";
import Overlay from "@restart/ui/esm/Overlay";
import { useRef, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function IconMatrix(iconProp) {
  const storyBaseUrl = "/stories/";
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Link to={storyBaseUrl + iconProp.name}>
        <img
          ref={target}
          //onMouseOver={() => setShow(!show)}
          //onMouseOut={() => setShow(!show)}
          className="matrix__icon__img"
          src={iconProp.img_src}
          alt="icon"
          delay={{ show: 700, hide: 400 }}
        />
      </Link>
      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div {...props} className="icon__info">
            <span>{iconProp.name} </span>
            <span>{iconProp.location} </span>
            <p> {iconProp.blurb} </p>
          </div>
        )}
      </Overlay>
    </>
  );
}
