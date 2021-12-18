import { Container, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar style={{ backgroundColor: "none" }}>
      <Container className="center__container">
        <Navbar.Brand style={{ color: "#ffffff" }} href="/">
          <i>behind</i> the numbers
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
