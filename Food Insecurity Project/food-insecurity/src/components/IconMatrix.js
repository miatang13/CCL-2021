import Button from "@restart/ui/esm/Button";
import Overlay from "@restart/ui/esm/Overlay";
import { useRef, useState } from "react";
import { OverlayTrigger } from "react-bootstrap";

export default function IconMatrix(iconProp) {
  /*
  const target = useRef(null);
  const [show, setShow] = useState(false);

  const renderInfo = () => {
    <div className="icon__info">
      <span>{props.data.name} </span>
      <span>{props.data.location} </span>
      <p> {props.data.blurb} </p>
    </div>;
  };

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderInfo}
    >
      <div className="individual__icon" ref={target}>
        <Button variant="success">Hover me to see</Button>
      </div>
    </OverlayTrigger>
  );*/
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <img
        ref={target}
        onClick={() => setShow(!show)}
        className="matrix__icon__img"
        src={iconProp.data.img_src}
        alt="icon"
        delay={{ show: 700, hide: 400 }}
      />
      <Overlay target={target.current} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div {...props} className="icon__info">
            <span>{iconProp.data.name} </span>
            <span>{iconProp.data.location} </span>
            <p> {iconProp.data.blurb} </p>
          </div>
        )}
      </Overlay>
    </>
  );
}
