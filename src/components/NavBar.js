import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import InfoModal from "../components/InfoModal";

export default function NavBar() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Navbar style={{ backgroundColor: "none" }}>
      <Container>
        <Navbar.Brand style={{ color: "#ffffff" }} href="/">
          <i>behind</i> the numbers
        </Navbar.Brand>
        <Nav className="me-auto">
          <Button variant="dark" onClick={() => setModalShow(true)}>
            About
          </Button>

          <InfoModal show={modalShow} onHide={() => setModalShow(false)} />
        </Nav>
      </Container>
    </Navbar>
  );
}
