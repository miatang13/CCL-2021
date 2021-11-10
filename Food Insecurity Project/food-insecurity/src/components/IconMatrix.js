import Button from "@restart/ui/esm/Button";
import Overlay from "@restart/ui/esm/Overlay";
import { useRef, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";

export default function IconMatrix(iconProp) {
  console.log(iconProp);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <img
        ref={target}
        onClick={() => setShow(!show)}
        className="matrix__icon__img"
        src={iconProp.img_src} //{require(`${iconProp.img_src}`)}
        alt="icon"
        delay={{ show: 700, hide: 400 }}
      />
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
